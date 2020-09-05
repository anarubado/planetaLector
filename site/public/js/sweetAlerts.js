window.addEventListener(
    "load", function(){
      if(document.querySelectorAll(".trash")){
        let trash = document.querySelectorAll(".trash");
        trash.forEach(function(item){
         
          item.addEventListener("submit", function(e){
            e.preventDefault();
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
                  this.submit()
                }
              })
          })
        })
      }
    
    }
)