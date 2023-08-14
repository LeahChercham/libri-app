import React from 'react'
import Header from './Header'

function UserTable(props){
return (
    <div>
        <table>
            <thead>
                <Header />
            </thead>
            <tbody>
            {/* {this.state.found.map(c => <Client updateClient={this.props.updateClient} client={c} key={c._id} getAllClients={this.getAllClients}/>)} */}
                </tbody>

        </table>

    </div>
)
}
export default UserTable