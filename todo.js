document.addEventListener("DOMContentLoaded", () => {
    const celdaC = document.querySelector(".cell.c");

    // Contenedor principal
    const container = document.createElement("div");
    container.classList.add("todo-container");

    // Botón para crear carpeta
    const nuevaCarpetaBtn = document.createElement("button");
    nuevaCarpetaBtn.textContent = "Nueva Sección";
    nuevaCarpetaBtn.onclick = () => {
        const nombre = prompt("Nombre de la sección:");
        if (nombre) {
            crearCarpeta(nombre);
        }
    };

    container.appendChild(nuevaCarpetaBtn);
    celdaC.appendChild(container);

    // Cargar desde localStorage
    const datos = JSON.parse(localStorage.getItem("todoData")) || {};

    function guardarDatos() {
        localStorage.setItem("todoData", JSON.stringify(datos));
    }

    function crearCarpeta(nombre) {
        if (datos[nombre]) {
            alert("Esa sección ya existe.");
            return;
        }
        datos[nombre] = [];
        render();
        guardarDatos();
    }

    function agregarTarea(nombreCarpeta, textoTarea) {
        datos[nombreCarpeta].push({ texto: textoTarea, completado: false });
        render();
        guardarDatos();
    }

    function render() {
        // Limpia todo menos el botón
        container.querySelectorAll(".carpeta").forEach(c => c.remove());

        for (const nombreCarpeta in datos) {
            const carpeta = document.createElement("div");
            carpeta.classList.add("carpeta");

            const titulo = document.createElement("h4");
            titulo.textContent = nombreCarpeta;

            const tareas = document.createElement("ul");

            datos[nombreCarpeta].forEach((tarea, idx) => {
                const li = document.createElement("li");
                li.textContent = tarea.texto;
                li.style.textDecoration = tarea.completado ? "line-through" : "none";
                li.onclick = () => {
                    tarea.completado = !tarea.completado;
                    guardarDatos();
                    render();
                };
                tareas.appendChild(li);
            });

            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Nueva tarea";

            const addBtn = document.createElement("button");
            addBtn.textContent = "Añadir";
            addBtn.onclick = () => {
                if (input.value.trim()) {
                    agregarTarea(nombreCarpeta, input.value.trim());
                    input.value = "";
                }
            };

            const tareaForm = document.createElement("div");
            tareaForm.className = "tarea-form";
            tareaForm.appendChild(input);
            tareaForm.appendChild(addBtn);

            carpeta.appendChild(titulo);
            carpeta.appendChild(tareas);
            carpeta.appendChild(tareaForm);

            container.appendChild(carpeta);
        }
    }

    render();
});
