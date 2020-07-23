import React, {useEffect, useState} from 'react';
import {CURRENT_USER, RESPONSE_MESSAGE, USER_ROLES, USERS, USERS_COUNT} from "../redux/constants/namespaces";
import {connect} from "react-redux";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Dropdown} from "primereact/dropdown";
import ConfirmDialog from "../component/ConfirmDialog";
import {
    deleteUser,
    editUserActive,
    editUserRole,
    loadUserRoleOptions,
    loadUsers,
    loadUsersCount
} from "../redux/functions/user-functions";
import {dateTimeToString} from "../util/date-util";

function Users({loadUsersCount, loadUsers, loadUserRoleOptions, usersCountStore, usersStore, userRolesStore, deleteUser,
                   editUserRole, responseStore, editUserActive, userStore}) {

    const [rows] = useState(10);
    const [first, setFirst] = useState(0);
    const [users, setUsers] = useState([]);
    const [usersCount, setUsersCount] = useState(undefined);
    const [userRoleOptions, setUserRoleOptions] = useState([]);
    const [userActiveOptions] = useState([{label: "Aktív", value: true}, {label: "Inaktív", value: false}]);

    useEffect(() => {
        loadUsersCount();
        loadUserRoleOptions();
    }, [loadUserRoleOptions, loadUsersCount]);

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

    if (!userStore.hasRole("SUPERADMIN")) {
        return <p className="font-size-normal font-weight-bold">Nincs jogosultság a megtekintéshez!</p>;
    }

    if (!usersCountStore.isReady()) {
        return usersCountStore.getMessage();
    }

    const reload = () => {
        loadUsers(first, rows);
        loadUsersCount();
    };

    const deleteUserById = (userId) => {
        deleteUser(userId).then(reload);
    };

    const changeRole = (userId, event) => {
        editUserRole(userId, event.value).then(reload);
    };

    const changeActive = (userId, event) => {
        editUserActive(userId, event.value).then(reload);
    };

    const onPage = (event) => {
        setFirst(event.first);
    };

    return (
        <>
            <p className="font-weight-bold font-size-medium mb-3">Felhasználók</p>
            <p className="mb-2">{responseStore.getMessage()}</p>
            <DataTable value={users} paginator={true} rows={rows} totalRecords={usersCount} responsive={true} autoLayout={true}
                       paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
                       currentPageReportTemplate={`Összesen: ${usersCount}`}
                       lazy={true} first={first} onPage={onPage} loading={!usersStore.isReady()}>
                <Column field="name" header="Név" />
                <Column field="email" header="Email" />
                <Column field="registrationDate" header="Regisztráció dátuma"
                        body={(user) => dateTimeToString(user.registrationDate)} />
                <Column field="active" header="Aktív"
                        body={(user) =>
                            <Dropdown options={userActiveOptions} value={user.active} disabled={user.role.code !== "USER"}
                                      onChange={(event) => changeActive(user.id, event)}/>
                        }/>
                <Column field="role" header="Jogosultság"
                        body={(user) =>
                            <Dropdown options={userRoleOptions} value={user.role.code} disabled={user.role.code === "SUPERADMIN" || user.active !== true}
                                      onChange={(event) => changeRole(user.id, event)}/>
                        }/>
                <Column header="Törlés" style={{width:"10%"}}
                        body={(user) => !["ADMIN","SUPERADMIN"].includes(user.role.code) &&
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
    loadUsers: loadUsers(dispatch),
    loadUsersCount: loadUsersCount(dispatch),
    loadUserRoleOptions: loadUserRoleOptions(dispatch),
    deleteUser: deleteUser(dispatch),
    editUserRole: editUserRole(dispatch),
    editUserActive: editUserActive(dispatch),
});
const mapStateToProps = state => ({
    usersStore: state[USERS],
    usersCountStore: state[USERS_COUNT],
    userRolesStore: state[USER_ROLES],
    responseStore: state[RESPONSE_MESSAGE],
    userStore: state[CURRENT_USER]
});
export default connect(mapStateToProps, mapDispatchToProps)(Users);