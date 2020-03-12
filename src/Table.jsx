import 'datatables.net-dt/css/jquery.dataTables.css';
import React from 'react';
import axios from 'axios';

const $ = require('jquery');
$.DataTable = require('datatables.net');

export default class Table extends React.Component {
  constructor(props) {
    super();
    this.state = {data: true}
  }

  componentDidMount() {
    this.$el = $(this.el);
    axios.get('./data.json')
      .then(res => {
        this.$el.DataTable({
          data: res.data.map(item => {
            let arr = [];
            for (let key in item) {
              arr.push(item[key])
            }
            return arr;
          }),
          columns: [
            {title: 'firstname'},
            {title: 'lastname'},
            {title: 'email'},
            {title: 'phonenumber'},
            {title: 'birthday_contact'},
            {title: 'company'}
          ]
        })
      })
      .catch(() => this.setState({data: false}))
    
  }

  componentWillUnmount() {
    this.$el.DataTable.destroy(true);
  }

  render() {
    if (this.state.data) {
      return (
        <div className="divchuk">
          <table className="display" width="100%" ref = {el => this.el = el }>
  
          </table>
        </div>
      )
    } else {
      return (
        <div className="divchuk">
          <p>Unfortunately, the data did not come</p>
        </div>
      )
    }
  }
}