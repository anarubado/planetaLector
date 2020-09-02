window.addEventListener(
    "load", function(){
        let trash = document.querySelector("#trash")
        if (trash) {
            trash.addEventListener("submit", function(e){
                e.preventDefault()
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: "Deberás volver a realizar esta acción en caso de deshacerla",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Si!',
                    cancelButtonText: 'Volver'
                  }).then((result) => {
                    if (result.value) {
                      trash.submit()
                    }
                  })
            })
        }
    }
)