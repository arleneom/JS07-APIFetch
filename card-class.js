class Card {
   id;
   email;
   last_name;
   first_name;
   avatar;
    constructor(id, email, first_name, last_name, avatar) {
       this.id = id;
       this.email = email;
       this.last_name = last_name;
       this.first_name = first_name;
       this.avatar = avatar;
    }
    
    basicCard() {
       return `
       <article id="user-card" class="col-sm-6 col-lg-3 card bg-primary" >
       <div class="card mx-auto mb-2" style="min-height: 20rem;">
        <p class="card-text">${this.id}</p>
        <img src="${this.avatar}" class="card-img-top  rounded-circle" alt="..." >         
       <div class="card-body">
       <h5 class="card-title">${this.first_name + "" + this.last_name}</h5>
       <p class="card-text">${this.email}</p>
       </div>
       </div>          
       </article>
       `;
    }
 }

 export default Card; 