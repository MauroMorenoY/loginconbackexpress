export interface authresponse{
    ok: boolean;
    uid?: string;
    name?: string;
    token?: string;
    email? : string;
    msg? : string;
    
}

export interface usuario {
    uid : string;
    name : string;
    email : string;
}