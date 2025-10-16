const toDo = document.getElementById("toDo");
const add = document.getElementById("add");
const list = document.getElementById("list");
const clean = document.getElementById("clean");

let contador = 0;

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem("tareas");

    if (tareasGuardadas) {
        const tareas = tareasGuardadas.split("|");
        tareas.forEach(t => {
            if (t.trim() !== "") agregarTarea(t, false);
        });
    }
}

function guardarTareas() {
    const tareas = [];
    const elementos = list.querySelectorAll("li");
    elementos.forEach(li => {
        let texto = li.textContent;
        if (li.classList.contains("completada")) texto += "(ok)";
        tareas.push(texto);
    });
    localStorage.setItem("tareas", tareas.join("|"));
}

function agregarTarea(texto, esNueva = true) {
    const li = document.createElement("li");
    li.textContent = texto.replace("(ok)", "");

    if (texto.endsWith("(ok)")) li.classList.add("completada");

    li.addEventListener("click", () => {
        li.classList.toggle("completada");
        guardarTareas();
    });

    list.appendChild(li);

    if (esNueva) {
        guardarTareas();
    }
}

add.addEventListener("click", () => {
    const texto = toDo.value.trim();
    if (texto) {
        agregarTarea(`${texto}`);
        toDo.value = "";
        guardarTareas();
    }
});

clean.addEventListener("click", () => {
    localStorage.clear();
});

window.addEventListener("load", cargarTareas);