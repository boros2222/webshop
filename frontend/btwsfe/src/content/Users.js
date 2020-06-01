import React, {useEffect, useState} from 'react';
import {RESPONSE_MESSAGE, USER_ROLES, USERS, USERS_COUNT} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {fetchToStore, sendToBackend} from "../redux/actions/request";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import ConfirmDialog from "../component/ConfirmDialog";

function Users({loadUsersCount, loadUsers, loadUserRoles, usersCountStore, usersStore, userRolesStore, deleteUser, editUserRole, responseStore}) {

    const [rows] = useState(10);
    const [first, setFirst] = useState(0);
    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(undefined);
    const [userRoleOptions, setUserRoleOptions] = useState([]);

    useEffect(() => {
        loadUsersCount();
        loadUserRoles();
    }, [loadUserRoles, loadUsersCount]);

    useEffect(() => {
        loadUsers(first, rows);
    }, [loadUsers, first, rows]);

    useEffect(() => {
        if (userRolesStore.isReady()) {
            userRolesStore.data.forEach(role => {
                setUserRoleOptions(prev => [...prev, {label: role.label, value: role.code, disabled: role.code === "SUPERADMIN"}])
            })
        }
    }, [userRolesStore]);

    useEffect(() => {
        if (usersCountStore.isReady()) {
            setUsersCount(usersCountStore.data);
        }
    }, [usersCountStore]);

    useEffect(() => {
        if (usersStore.isReady()) {
            setUsers(usersStore.data);
        }
    }, [usersStore]);

    if (!usersCountStore.isReady()) {
        return <i className="pi pi-spin pi-spinner font-size-large"/>
    }

    const reload = () => {
        loadUsers(first, rows);
        loadUsersCount();
    };

    const deleteUserById = (userId) => {
        deleteUser(userId, reload);
    };

    const changeRole = (userId, event) => {
        editUserRole(userId, event.value, reload);
    };

    const dateToString = (date) => {
        return `${date.year}.${dateNumberToString(date.monthValue)}.${date.dayOfMonth}. ${dateNumberToString(date.hour)}:${dateNumberToString(date.minute)}`
    };

    const dateNumberToString = (dateNumber) => {
        return `${dateNumber < 10 ? '0' : ''}${dateNumber}`;
    };

    const onPage = (event) => {
        setFirst(event.first);
    };

    return (
        <>
            <p className="font-weight-bold font-size-medium mb-3">Felhasználók</p>
            <p className="mb-2">{responseStore.getMessage()}</p>
            <DataTable value={users} paginator={true} rows={rows} totalRecords={usersCount} responsive={true}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                       currentPageReportTemplate={`Összesen: ${usersCount}`}
                       lazy={true} first={first} onPage={onPage} loading={!usersStore.isReady()}>
                <Column field="name" header="Név" />
                <Column field="email" header="Email" />
                <Column field="registrationDate" header="Regisztráció dátuma"
                        body={(user) => dateToString(user.registrationDate)} />
                <Column field="role" header="Jogosultság"
                        body={(user) =>
                            <Dropdown options={userRoleOptions} value={user.role.code} disabled={user.role.code === "SUPERADMIN"}
                                      onChange={(event) => changeRole(user.id, event)}/>
                        }/>
                <Column header="Törlés" style={{width:"10%"}}
                        body={(user) => user.role.code !== "SUPERADMIN" &&
                            <ConfirmDialog headerText="Felhasználó törlése" text={`Biztosan törölni kívánja a felhasználót (${user.email}) ?`}
                                           onConfirm={() => deleteUserById(user.id)}>
                                <button type="button" className="d-inline-flex custom-button red-button font-size-normal flex-center">
                                    <i className="pi pi-times"/>
                                </button>
                            </ConfirmDialog>
                        }/>
            </DataTable>
        </>
    )
}

const mapDispatchToProps = dispatch => ({
    loadUsers: (offset, limit) => dispatch(fetchToStore(USERS, `/user/list/${offset}/${limit}`, false)),
    loadUsersCount: () => dispatch(fetchToStore(USERS_COUNT, `/user/count`, false)),
    loadUserRoles: () => dispatch(fetchToStore(USER_ROLES, `/user/list/role`, true)),
    deleteUser: (userId, callback) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/user/delete/${userId}`, undefined, callback)),
    editUserRole: (userId, role, callback) => dispatch(sendToBackend(RESPONSE_MESSAGE, `/user/role/edit/${userId}/${role}`, undefined, callback)),
});
const mapStateToProps = state => ({
    usersStore: state[USERS],
    usersCountStore: state[USERS_COUNT],
    userRolesStore: state[USER_ROLES],
    responseStore: state[RESPONSE_MESSAGE],
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);