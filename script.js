/* Para acceder a un elemento HTML con un ID se puede usar
"document.getElementById()" method */

const calorieCounter = document.getElementById("calorieCounter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

/* Lo que hicimos aca fue declarar variables con los elementos del HTML que poseen el id correspondiente */

/* En programacion es de buena practica usar los prefijos en variables con "is" "has" 
para indicar que la variable es un boolean */

let isError = false;

/* Por mas que declaremos un input como number javaScript recibe un string
necesitamos escribir una funcion para limpiar el string y asegurarnos de recibir un number */

/* necesitas dividir el str en caracteres individuales. Podemos utilizar el METHOD "split()".
El split() method divide un string en un array de substrings y retorna un nuevo array.
lo podes pasar en un separador opcional que le dice al method donde cada split deberia pasar */
/* EJEMPLOS

const str = 'Hello World';
const strArray = str.split('');
// ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]
*/

function cleanInputString(str) {
  const regex = /[+-\s]/g;
  return str.replace(regex, "");
  //   const strArray = str.split("");
  //   let cleanStrArray = [];
  //   for (let i = 0; i < strArray.length; i++) {
  //     if (!['+', '-',' '].includes(strArray[i])){//aca estamos viendo como condicion si
  //         cleanStrArray.push(strArray[i]);// dentro del strArray no se incluyen esos caracteres lo pusheamos al otro array.
  //     }
  // }
}

/* En javaScript las expresiones regulares "regex" se utilizan para buscar patrones
dentro de las cadenas de texto. Se indican encerrando el patron desaedo entre barras
diagonales / por ejemplos

const regex = /hello/; 

en las expresiones regulares, las abreviaturas estan precedidas por una barra invertida \
por ejemplo la abreviacion utilizada anteriormente "\s}" va hacer coincidir cualquier espacio
en blanco.
las abreviaturas nos permiten coincidir caracteres especificos sin necesidad de escribirlos

para hacer que una expresion regular que se encargue de analizar cada caracter individualmente
 tenes que transformarla en una character class, para hacer esto tenes que colocar los caracteres
 []
 flags regex: 
 Regex tambien puede tomar specifics flags para alterar el comportamiento de coincidencia
 de los patrones. Las banderas se agregan despues del cierre de las barras diagonales / 
 la bandera "g" significa global, indicara al pattern que continue buscando despues de haber
 encontrado una coincidencia */

/* Los Strings tienen un .replace() method que te permite reemplazar caracteres en un string
 con otro string. .replace toma dos argumentos.
 el primero es la secuencia de caracter a reemplazar - puede ser un string o un regex pattern
 El segundo es el string que reemplaza por ejemplo esto reemplazaria todas las l con 1:

 "hello".replace(/l/g, "1"); */

function isInvalidInput(str) {
  const regex = /\d+e\d+/i;
  return str.match(regex);
}

/* Regex tiene otra bandera (flag) /i que es "insensitive" */

/*Cuando añades el signo + despues de un character class en una expresion regex,
indica que esa clase de caracteres puede aparecer una o mas veces en al cadena 
que estas buscando */

/* hay una abreviatura en character class para coincidir con cualquier digito "/d" */

/* Strings tienen un method .match() que toma un argumento regex
.match() va a retornar un array con resultados de coincidencia 
que contiene la primer coincidencia, o en caso de usar la bandera global
todas las coincidencias */

function addEntry() {
  const targetInputContainer = document.querySelector(
    `#${entryDropdown.value} .input-container`
  ); /*Esta línea busca en el documento HTML un elemento que tenga un ID específico,
    obtenido del valor seleccionado en un elemento de menú desplegable (entryDropdown).
   Luego, encuentra el elemento dentro de este contenedor que tiene la clase input-container.
   Este elemento será el contenedor donde se agregarán los nuevos campos de entrada.*/
  const entryNumber =
    targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
  /*Esta línea cuenta cuántos campos de entrada de tipo texto ya existen dentro del contenedor obtenido anteriormente.
     Esto se hace mediante la búsqueda de todos los elementos input de tipo text dentro del contenedor y contando cuántos se encontraron.*/
  let HTMLString = `
  <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
  <input type="text" placeholder="Name" id="${entryDropdown.value}-${entryNumber}-name" />
  <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
  <input type="number" placehold/*er="Calories" id="${entryDropdown.value}-${entryNumber}-calories" min="0"/>`;
  /*Aquí se define una cadena de plantilla literal que contiene el HTML 
para agregar una nueva entrada. Dentro de la cadena,
 se definen etiquetas <label>y<input> para el nombre y las calorías de la nueva entrada.
  El ID de cada campo de entrada se construye usando el valor seleccionado
   en el menú desplegable (entryDropdown), el número de entrada (entryNumber`) 
y un identificador único para el tipo de campo (nombre o calorías). */
  targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
  // aca agregamos el molde de html al HTML y permitimos que al actualizarlo no se borre
  // el metho insertAdjacentHtml toma dos argumentos
  //el primer argumento es un string que especifica la posicion del elemento insertado
  // el segundo argumento es un string que contiene el html a ser insertado
}

/* aca lo que vamos hacer es tomar los entry de los inputs, vamos a necesitar saber
a cual categoria pertenece cada entry
recordemos que anteriormente declaramos una variable "entryDropwown" 
con el entry del dropdown button. Podemos usar ese valor de propiedad para obtener
el valor de la opcion seleccionada */

/* en targetId lo que hacemos es tomar el valor (value) dentro del dropdown y le agregamos
adelante con la concatenacion un # para hacer un id
luego en el targetInputContainer lo que hacemos es buscar en el DOM con el querySelector
aquel input que machee con el valor dle targetId obtenido y la class .input-container*/

/* javaScript tiene una funcionalidad llamada template literals, que te permite 
interpolar variables directamente en el string. template literals estan denotadas
con backticks ``, como oposicion a las single y doble comillas. Las variables pueden
ser pasadas en un template literal rodeando la variable con ${} el valor de la variable
sera insertado en el string */

/* Vamos a querer numerar las entradas que el usuario agrega. Para obtener
todos los number inputs podemos utilizar el method querySelectorAll()
El method querySelectorAll() retorna un NodeList de todos los elementos que 
coinciden con el selector. Un NodeList es un array como un objeto, por eso podes acceder
al elemento usando bracket notation [1] */

/* Cada entry tendra un text input  para la entrada del nombre, y un number input
 para las calorias. 
 para obtener la cuenta de los numeros de entradas podes realizar consultas mediantes los
 campos de entrada de text. No podes realizar consultas numericas porque tienes un campo
 de entrada adicional para el presupuesto calorico */

/* en Let HTMLString = "" lo que estamos haciendo es generar el molde de html*/

/* para ver nuestro nuevo contenido de HTML para el targetInputContainer vamos a 
utilizar innerHTML */

/* COMO AGREGAR HTML DESDE JAVASCRIPT!!!!!!!!

<form id="form">
  <label for="first-name">First name</label>
  <input id="first-name" type="text">
</form>

si queremos agregaar otro label y otro input a este form
podemos utilizar innertHTML como veremos a continuacion:

const formElement = document.getElementById("form");
const formContent = `
  <label for="last-name">Last name</label>
  <input id="last-name" type="text">
`;
formElement.innerHTML += formContent; */

/* El siguiente ejemplo usa el method addEventListener para agregar un 
evento de click a un boton. Cuando el boton es clickeado una funcion es llamada

<button class="btn">Print name</button>

const button = document.querySelector('.btn');
function printName() {
  console.log("Jessica");
}
button.addEventListener('click', printName);

the addEventListener method toma dos argumentos 
el primero es el evento a escuchar ej: click 
el segundo es la funcion de retorno, o la funcion que corre cuando el
evento es gatillado. */

addEntryButton.addEventListener("click", addEntry);

//funcion que va a obtener la cuenta de las calorias de las entradas del user

function getCaloriesFromInputs(list) {
  let calories = 0;
  for (const item of list) {
    //los valores de NodeList que vamos a pasarle a list van a consistir en input
    //element, asi que vamos a mirar al value attribute de cada elemento
    const currVal = cleanInputString(item.value);
    const invalidInputMatch = isInvalidInput(currVal);
    if (invalidInputMatch) {
      alert(`Invalid Input: ${invalidInputMatch[0]}`);
      isError = true;
      return null;
    }
    calories += Number(currVal);
    return calories;
  }
}

//el parametro list va a ser el resultado de un querySelector que va a retornar
//un NodeList, un NodeList es una lista de elementos como un array. Contiene los
//elementos que coinciden con el querySelector. Vamos a necesitar hacer loop(bucle)

// FOR OF LOOP !!!!!!!!!!!!!!!!!
//es usador para iterar sobre elementos en un objeto iterable como un array
//La variable declarada en el loop representa el elemento actual siendo iterado.

// for (const element of elementArray)
// console.log(element);

// Ahora es momento de poner todo junto
// Vamos a hacer otra funcion event listener, y el primer argumento pasado va a ser
// el Browser Event - e que es un nombre comun para este parametro
const calculateCalories = (e) => {
  e.preventDefault(); // El metho preventDefault va a prevenir que por defecto la pagina se resetee en el boton submit
  isError = false;
  const breakfastNumberInputs = document.querySelectorAll(
    "#breakfast input[type=number]"
  );
  //Esto va a retornar cualquier number input que estan en el elemento #breakfast
  const lunchNumberInputs = document.querySelectorAll(
    "#lunch input[type=number]"
  );
  const dinnerNumberInputs = document.querySelectorAll(
    "#dinner input[type=number]"
  );
  const snacksNumberInputs = document.querySelectorAll(
    "#snacks input[type=number]"
  );
  const exerciseNumberInputs = document.querySelectorAll(
    "#exercise input[type=number]"
  );
  // Ahora que tenemos nuestra lista de elementos vamos a poder pasarlos a la funcion
  // getCaloriesFromInputs para extraer las calorias totales
  const breakfastCalories =
    breakfastNumberInputs.length > 0
      ? getCaloriesFromInputs(breakfastNumberInputs)
      : 0;
  const lunchCalories =
    lunchNumberInputs.length > 0 ? getCaloriesFromInputs(lunchNumberInputs) : 0;
  const dinnerCalories =
    dinnerNumberInputs.length > 0
      ? getCaloriesFromInputs(dinnerNumberInputs)
      : 0;
  const snacksCalories =
    snacksNumberInputs.length > 0
      ? getCaloriesFromInputs(snacksNumberInputs)
      : 0;
  const exerciseCalories =
    exerciseNumberInputs.length > 0
      ? getCaloriesFromInputs(exerciseNumberInputs)
      : 0;
  //aca lo que hicimos fue solucionar un bug que pasaba cuando queriamos agregar unicamente una comida y el resto de elementos dejarlos sin agregar
  //Pasaba que se tomaba como undefined el elemento no agregado y luego a la hora de sumar eso retornaba un NaN (not a number)
  //agregamos este operador ternario para que cuando no se haya colocado nada dentro de cada input se retorne 0 y si se puso algo se realice la cuenta de getCaloriesFromInputs
  /* En resumen En este código, verificamos primero si hay campos de entrada presentes para el desayuno antes de calcular las calorías del desayuno.
   Si no hay campos de entrada presentes, establecemos breakfastCalories en 0. 
  Luego, utilizamos esta variable para calcular las calorías consumidas. Este enfoque garantiza que no obtendrás NaN cuando intentes sumar las calorías consumidas.*/

  const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
  console.log(breakfastCalories);
  console.log(lunchCalories);
  console.log(dinnerCalories);
  console.log(snacksCalories);
  console.log(exerciseCalories);
  console.log(budgetCalories);

  // Como getCaloriesFromInputs va a setear la bandera isError a verdadero si un
  //input invalido es detectado vamos a agregar un if para chequear este valor booleano
  //y si es verdadero colocar un return para terminar la ejecucion de la funcion
  if (isError) {
    return;
  }
  //ahora vamos a sumar las calorias
  const consumedCalories =
    breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
  console.log(consumedCalories);
  const remainingCalories =
    budgetCalories - consumedCalories + exerciseCalories;
  //Ahora necesitamos saber si el usuario esta en deficit calorico o superavit
  const surplusOrDeficit = remainingCalories < 0 ? "Surplus" : "Deficit";
  // Vamos a construir el molde de HTML que sera mostrado en el output.
  output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(
    remainingCalories
  )} Calorie ${surplusOrDeficit}</span>
  <hr>
  <p>${budgetCalories} Calories Budgeted</p>
  <p>${consumedCalories} Calories Consumed</p>
  <p>${exerciseCalories} Calories Burned</p>
    `;
  output.classList.remove("hide");
};

//Math.abs() es un method que retorna un numero absoluto

// classLisst en javaScript nos permite manipular las clases CSS de un elemento
// HTML de manera dinamica. Permite agregar,quitar, y verificar clases en un elemento
// sin tener que trabajar directamente con la cadena de texto que representa las clases
// del elemento.
//Cuando accedemos a la propiedad "classList" obtenemos un objeto de tipo DOMTokenList
// que es una lista de tokens (en este caso nombres de clases Css) asociados con el elemento.
//Esta lista proporciona varios method para trabajar

calorieCounter.addEventListener("submit", calculateCalories);

const clearForm = () => {
  const inputContainers = Array.from(
    document.querySelectorAll(".input-container")
  );
  for (const container of inputContainers) {
    container.innerHTML = "";
  }
  budgetNumberInput.value = "";
  output.innerText = "";
  output.classList.add("hide");
};

clearButton.addEventListener("click", clearForm);
