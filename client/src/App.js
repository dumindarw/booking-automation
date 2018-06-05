import React, { Component } from 'react'
import { Grid, Table, Button, Dropdown } from 'semantic-ui-react'
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './css/custom.css';

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

    this.state = { subaccounts: [], loaded: false }
    this.onChangeElement = this.onChangeElement.bind(this);
    this.onAddAccount = this.onAddAccount.bind(this);
  }

  componentDidMount() {

    this.onFetchAccounts();
  }

  onAddAccount(e) {

    const axiosPost = axios({
      url: 'https://lit-plains-59416.herokuapp.com/createAccount',
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

        //TODO : UPDATE UI

        console.log("New Sub Account Added : " + success.data.subaccount.username)
      },
      error => console.log(error)
    );

  }

  onChangeElement(key, event) {

    const axiosPost = axios({
      url: 'https://lit-plains-59416.herokuapp.com/setRole',
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

        console.log("Role Updated : " + success.data.role)

        //TODO : UPDATE UI


        //let arr = [];
        //arr [0] = {acc:success.data.acc, role: success.data.role};

        //this.setState({subaccounts : [... this.subaccounts, arr [0]]})

      },
      error => console.log(error)
    );

  }

  onFetchAccounts() {

    const axiosPost = axios({
      url: 'https://lit-plains-59416.herokuapp.com/getAccounts',
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
                      <Dropdown key={elem.acc} selection options={roleOptions}
                        onChange={(e) => this.onChangeElement(elem.acc, e)}
                      />
                    </Table.Cell>
                  </Table.Row>)
                })
                }


              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan='3'>
                    <Button primary onClick={this.onAddAccount}>Create New Sub-Account</Button>
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
