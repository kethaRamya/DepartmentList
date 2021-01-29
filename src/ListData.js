import React from "react"
import { ModalForm } from './modal'
import { constant } from './constant'
import { UpdateModalForm } from './updatemodal'
import TablePagination from '@material-ui/core/TablePagination';

export default class ListData extends React.Component {
  constructor() {
    super();
    this.state = {
      listData: [],
      filter: '',
      rowsPerPage: 4,
      page: 0,
      data: []
    }
    this.renderList = this.renderList.bind(this)
    this.OnchangeHandlar = this.OnchangeHandlar.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentDidMount() {
    this.renderList()
  }

  renderList() {
    let token = JSON.parse(localStorage.getItem('login'))

    console.log("token", token.store)
    fetch("http://15.206.118.222:5000/admin/department/list", {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token.store,
        'content-type': 'application/json',
        'Accept': 'application/json'

      }
    }).then((response) => response.json().then((result) => {
      console.log("response", result.data)
      this.setState({
        data: result.data,
        listData: result.data.rows
      }, () => {
        console.log("list data", this.state.listData)
      })
    }))
  }
  OnchangeHandlar(event) {

    this.setState({ filter: event.target.value })


  }
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  delete(item) {
    const listData = this.state.listData.filter(i => i.id !== item.id)
    this.setState({ listData })
  }
  render() {
    let { page, rowsPerPage } = this.state
    let username = localStorage.getItem('username')
    const { filter, listData } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = listData.filter(item => {
      return Object.keys(item).some(key =>
        item.name.toLowerCase().includes(lowercasedFilter)
      );
    });
    return (
      <div className="container" style={{ marginTop: '40px' }}>

        <h3>List of the Departments</h3>

        <input type="text" id="myInput" onChange={this.OnchangeHandlar} placeholder="Search the Name.." title="Type in a name" />

        <table id="myTable">
          <tr className="header">
            <th style={{ width: "40%" }}>Name</th>
            <th style={{ width: "20%" }}>Status</th>
            <th style={{ width: "20%" }}>Actions</th>
          </tr>
          {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, i) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td style={{ display: 'flex' }}>
                  {/* <button>add</button> */}
                  <p >
                    {constant.admin == username || constant.manager == username || constant.user != username ? <ModalForm renderList={this.renderList} /> : "No Actions"}
                  </p>
                  <p style={{ marginLeft: "15px" }}>
                    {constant.admin == username || constant.manager == username || constant.user != username
                      ?
                      <UpdateModalForm
                        id={item.id}
                        renderList={this.renderList} />
                      : null}
                  </p>
                  <p style={{ marginLeft: "15px", cursor: 'pointer' }} onClick={() => { this.delete(item) }}>
                    {constant.admin == username && constant.manager != username && constant.user != username
                      ?
                      "Delete"
                      : null}
                  </p>
                </td>
              </tr>
            )
          })}
          <tr>

            <td><TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={this.state.data.count}
              rowsPerPage={rowsPerPage}
              page={page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            /></td>
            <td></td>
            <td></td>

          </tr>
        </table>


      </div>
    )
  }
}