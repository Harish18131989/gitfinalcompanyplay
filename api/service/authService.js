

export class authservice {

    constructor(apifix) {
        this.apifix = apifix;

    }

    async generate_token(username,password)
    {

        return this.apifix.post('/auth',{
            data:
            {username,password}
        })
    }
}