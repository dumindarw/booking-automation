import React, { Component } from 'react'
import { Button, Label, Form, Input, Grid, Table, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './css/custom.css';

const SERVER_URL = 'https://lit-plains-59416.herokuapp.com/';

const roleOptions = [
  { text: '0', value: '0' },
  { text: '1', value: '1' },
  { text: '2', value: '2' },
  { text: '3', value: '3' },
  { text: '4', value: '4' },
  { text: '5', value: '5' },
  { text: '6', value: '6' }
];

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { subaccounts: [], loaded: false}
    this.onChangeElement = this.onChangeElement.bind(this);
    this.onAddAccount = this.onAddAccount.bind(this);
  }

  handleRef = (c) => {
    this.inputRef = c
  }

  componentDidMount() {

    this.onFetchAccounts();
  }

  onAddAccount(e) {

    e.preventDefault();


    console.log(this.inputRef);

  
    const axiosPost = axios({
      url: SERVER_URL + 'createAccount',
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      responseType: 'json',
    });

    axiosPost.then(
      success => {

        console.log(success);

        //let arr = [];

        //arr = [...this.subaccounts];
        //arr.push({acc: success.data.subaccount.username, role: success.data.subaccount.role});

        //this.setState({subaccounts : [...arr]});

        //TODO : UPDATE UI

        console.log("New Sub Account Added : " + success.data.subaccount.username)
      },
      error => console.log(error)
    );

  }

  onChangeElement(key, event) {

    const axiosPost = axios({
      url: SERVER_URL + 'setRole',
      method: 'post',
      data: {
        subAcc: key,
        role: event.target.innerText
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      responseType: 'json',
    });

    axiosPost.then(
      success => {

        let arr = [];
        let newArr = [];

        arr = [...this.state.subaccounts];
        let updatedObj = {acc:success.data.acc, role: success.data.role};

        arr.filter(obj=>{
          if(obj.acc !== updatedObj.acc){
            newArr.push({acc: obj.acc, role: obj.role});
          }else{
            newArr.push({acc: updatedObj.acc, role: updatedObj.role});
          }
          return newArr;
        });

        this.setState({subaccounts : [...newArr]})

      },
      error => console.log(error)
    );

  }

  onFetchAccounts() {

    const axiosPost = axios({
      url: SERVER_URL + 'getAccounts',
      method: 'post',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      responseType: 'json',
    });

    axiosPost.then(
      success => {
        let tmpArr = [];
        this.setState({ loaded: true });
        for (var key in success.data.subaccounts) {
          if (success.data.subaccounts.hasOwnProperty(key)) {

            tmpArr.push({ acc: key, role: success.data.subaccounts[key].role });
          }
        }

        this.setState({ subaccounts: [...tmpArr] })

      },
      error => console.log(error)
    );

  }

  render() {

    const { subaccounts, loaded } = this.state;

    if (loaded) {

      return (

        <Grid columns='equal'>
          <Grid.Column>

          </Grid.Column>
          <Grid.Column width={8}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Sub-Account</Table.HeaderCell>
                  <Table.HeaderCell>Role</Table.HeaderCell>
                  <Table.HeaderCell>Change Role</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {subaccounts.map((elem) => {
                  return (<Table.Row>
                    <Table.Cell >{elem.acc}</Table.Cell>
                    <Table.Cell >{elem.role}</Table.Cell>
                    <Table.Cell>
                      <Dropdown placeholder="Select Role" key={elem.acc} selection options={roleOptions}
                        onChange={(e) => this.onChangeElement(elem.acc, e)}
                      />
                    </Table.Cell>
                  </Table.Row>)
                })
                }
              </Table.Body>
              <Table.Footer>
              
                <Table.Row>
                
                <Table.HeaderCell colSpan="3">
                <Form onSubmit={this.onAddAccount}>
                <Label>
                  <Input placeholder="Sub Account Name" type="text" ref={this.handleRef} />
                  </Label>
                  <Label>
                  <Dropdown placeholder="Select Role"  selection options={roleOptions} />
                  </Label>
               
                    <Button type="submit" primary>Create New Sub-Account</Button>
                    </Form>
                  </Table.HeaderCell>
                  
                </Table.Row>
              
              </Table.Footer>
            </Table>

          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid>)
    }
    else {
      return <div></div>
    }
  }


}

export default App
