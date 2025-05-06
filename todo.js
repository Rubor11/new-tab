// Definimos la variable datos al principio
let datos = JSON.parse(localStorage.getItem("todoData")) || {};

// Luego tu código continúa normalmente...
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
            crearCarpeta(nombre.toUpperCase());
        }
    };

    container.appendChild(nuevaCarpetaBtn);
    celdaC.appendChild(container);

    function guardarDatos() {
        localStorage.setItem("todoData", JSON.stringify(datos));
    }

    function crearCarpeta(nombre) {
        if (datos[nombre]) {
            alert("Esa sección ya existe.");
            return;
        }
        datos[nombre] = {
            creado: new Date().toLocaleString(),
            tareas: []
        };
        console.log("Fecha de creación:", datos[nombre].creado);
        render();
        guardarDatos();
    }

    function agregarTarea(nombreCarpeta, textoTarea) {
        datos[nombreCarpeta].tareas.push({ texto: textoTarea, completado: false });
        render();
        guardarDatos();
    }

    function render() {
        container.querySelectorAll(".carpeta").forEach(c => c.remove());

        for (const nombreCarpeta in datos) {
            const carpeta = document.createElement("div");
            carpeta.classList.add("carpeta");

            // Contenedor para el título y el botón eliminar
            const header = document.createElement("div");
            header.style.display = "flex";
            header.style.justifyContent = "space-between";
            header.style.alignItems = "center";

            const titulo = document.createElement("h4");
            titulo.textContent = nombreCarpeta;

            const eliminarBtn = document.createElement("button");
            eliminarBtn.classList.add("boton-papelera");
            eliminarBtn.innerHTML = `
                <svg class="icono-papelera" fill="#000000" viewBox="0 0 1024 1024" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z"/>
                    <path d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619z"/>
                    <path d="M422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"/>
                    <path d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z"/>
                </svg>
            `;
            eliminarBtn.onclick = () => {
                if (confirm(`¿Eliminar la sección "${nombreCarpeta}"?`)) {
                    delete datos[nombreCarpeta];
                    guardarDatos();
                    render();
                }
            };

            header.appendChild(titulo);
            header.appendChild(eliminarBtn);

            const fecha = document.createElement("p");
            fecha.textContent = `Creado el: ${datos[nombreCarpeta].creado}`;
            fecha.style.fontSize = "0.8em";
            fecha.style.color = "#666";

            // Verificación antes de iterar sobre las tareas
            if (datos[nombreCarpeta].tareas && Array.isArray(datos[nombreCarpeta].tareas)) {
                const tareas = document.createElement("ul");
                datos[nombreCarpeta].tareas.forEach((tarea, idx) => {
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
                carpeta.appendChild(tareas);
            } else {
                console.error(`No se encontraron tareas para la carpeta ${nombreCarpeta}`);
            }

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

            carpeta.appendChild(header);
            carpeta.appendChild(fecha);
            carpeta.appendChild(tareaForm);
            container.appendChild(carpeta);
        }
    }

    render();
});
