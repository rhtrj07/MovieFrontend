
export class Actor {
    public id: number;
    public aname: string;
    public username: string;
    public age: number;
    public experience: number;
    public email: String;
    public gender: String;
    public phone : number;
    public photo: String;
  
    constructor(id: number, aname: string, age: number,experience: number,username: string ,email : string ,gender : string , photo : string, phone : number) {
      this.id = id;
      this.aname = aname;
      this.username = username;
      this.age = age;
      this.experience = experience;
      this.photo = photo;
      this.phone = phone;
      this.gender = gender;
      this.email = email;
    }
  }
  