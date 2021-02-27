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

    constructor(_name: string | object, lastname?: string, job?: string, permits?: number, status?: UserDTOStatus, user?: string, password?: number, id = '') {
        if (typeof _name === 'object') {
            const { _id, name, lastname, job, permits,
                status, user, password } = _name as UserDTO;
            this._id = _id;
            this.name = name;
            this.lastname = lastname;
            this.job = job;
            this.permits = permits;
            this.status = status;
            this.user = user;
            this.password = password;
        } else if (typeof _name === 'string') {
            this._id = id;
            this.name = _name;
            this.lastname = lastname;
            this.job = job;
            this.permits = permits;
            this.status = status;
            this.user = user;
            this.password = password;
        }
    }
}