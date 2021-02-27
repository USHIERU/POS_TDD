import UserDTOStatus from './enums/UserDTOStatus'

export default class UserDTO {
    public _id: string;
    public name: string;
    public lastname: string;
    public job: string;
    public permits: number;
    public status: UserDTOStatus;
    public user: string;
    public password: number;

    constructor(name: string, lastname: string, job: string, permits: number, status: UserDTOStatus, user: string, password: number, id = '') {
        this._id = id;
        this.name = name;
        this.lastname = lastname;
        this.job = job;
        this.permits = permits;
        this.status = status;
        this.user = user;
        this.password = password;
    }
}