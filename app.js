import Card from "./card-class.js";


const urlApi = "https://reqres.in/api/users?delay=3";

//===================Solicitud get=========================
//La primera vez, el usuario hace una solicitud get al servidor.

const getUsers = async () => {
  let userObj;
  try {
    const response = await fetch(urlApi);
    const users = await response.json();
    userObj = users.data;

    imprimirEnDOM(userObj);
    saveLocal(userObj);
    
    console.log("request");
  } catch (error) {
    console.log(error);
  }
  return userObj;
};


const boton = document.getElementById("boton");
boton.addEventListener("click", () => {
  boton.classList.add("d-none");
  
//===================volver a hacer solicitud get========================
/**
 * En caso de que pase más de 1 minuto, se debe volver a hacer una
 */   
   if (verifyTime()) {
      let data = localStorage.getItem("usersTime");
      data = JSON.parse(data)
      console.log(data);
      imprimirEnDOM(data.users);
    } else{
      getUsers();
    }
  });



//=====================Mostrar en DOM============================
/**
 * Los datos almacenados en local storage se muestran en el DOM
 */
const usersContainer = document.getElementById("users-container");

function imprimirEnDOM(users) {
  const usersCards = users.map((user) => {
    const card = new Card(
      user.id,
      user.email,
      user.first_name,
      user.last_name,
      user.avatar
    );

    return card.basicCard();
  });

  return (usersContainer.innerHTML = usersCards.join(""));
}
//================Almacena en local storage con timeStamp =================
/**
 * .localStorage.setItem
 * El servidor devuelve los datos de usuario y se almacenan
 * en el local storage, donde debe guardarse la fecha y hora de solicitud.
 */
const saveLocal = (users) => {
      let usersGetTime;
   const time = new Date().getTime();
       usersGetTime = {
      users: users,
      time: time,
   };
   localStorage.setItem("usersTime", JSON.stringify(usersGetTime));
   return usersGetTime;
};



//==================limite de tiempo Local Storage ===========================
/**
 La segunda vez, se verifica la fecha en que se almacenó y si 
 se encuentra en el plazo de tiempo de 1 minuto, se debe leer 
 de local storage (para ello debe de checar la fecha y hora de 
   la primera solicitud)


   Los datos recuperados deben almacenarse localmente, con un tiempo de 
   vida de un minuto, para que la próxima recuperación de datos no tarde 
 (mientras esté en el tiempo de vida).
 * 
 */

 const verifyTime = () => {
   // Validar si existe la clave
   if (!localStorage.getItem("usersTime")) {
         return false;
   }
 
   const newTime = new Date().getTime();
   let setTime = localStorage.getItem("usersTime");
   setTime = JSON.parse(setTime);
   setTime = setTime.time;
   // Calcular la diferencia de tiempo
   console.log( "New time:",newTime  );
   console.log("TimeStamp:", setTime );
   const liveTime = newTime - setTime;
      
   // Establecer límite de tiempo (en milisegundos)
   const timeLimit = 60000; // 1 minuto
 
   // Verificar si los datos están desactualizados
   if (liveTime >= timeLimit) {
     console.warn("Los datos están desactualizados");
     // Actualizar los datos, mostrar advertencia, etc.
     return false;
   } else {
     console.log("Los datos están actualizados");
     return true;
   }

  
 };
 
 



//=================
/**
 * Mostrar los datos recuperados en la interfaz del usuario,
 * en una tabla o en otro componente para visualizarlo.
 * La visualización de los datos debe ser responsiva
 *Las imágenes de los avatares debe mostrarse de manera circular.
 * Usa la API DOM para actualizar el resultado.
 * Usa estilos con Bootstrap.
 */


