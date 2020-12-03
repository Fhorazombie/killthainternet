	$( document ).ready(function() { 

			var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

			var tagOrComment = new RegExp(
			    '<(?:'
			    // Comment body.
			    + '!--(?:(?:-*[^->])*--+|-?)'
			    // Special "raw text" elements whose content should be elided.
			    + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
			    + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
			    // Regular name
			    + '|/?[a-z]'
			    + tagBody
			    + ')>',
			    'gi');

			function removeTags(html) {
			  var oldHtml;
			  do {
			    oldHtml = html;
			    html = html.replace(tagOrComment, '');
			  } while (html !== oldHtml);
			  return html.replace(/</g, '&lt;');
			}


	        function hndlr(response) {
	          for (var i = 0; i < response.items.length; i++) {
	            var item = response.items[i];
	            console.log(item)
	            console.log(item["link"])
	            document.getElementById("content").innerHTML += "<br>" + "<img id='img-"+i+"' class='img_busquedas' src='" + item["link"] + "' >"  
	          }

	          $(".img_busquedas").on('load', function() {
	             	$("#menu").fadeOut()
	             	$("#content").fadeIn()
	             	var imagenes = $('.img_busquedas').length
	             	var imagen = 0

             		$('.img_busquedas').click(function(e) {
             			var id = $(this).attr("id")
             			id = "#"+id

             		    var offset = $(id).offset();
             		    var pagexxx = e.pageX - offset.left
             		    var pageyyy = e.pageY - offset.top
             		    var width = $(id).width()
             		    var height = $(id).height()

             		    var width1 = width / 3
             		    var width2 = width1 + width1
             		    var ancho = ""

             		    var height1 = height / 3
             		    var height2 = height1 + height1
             		    var alto = ""

             		    console.log("Primer termino W " + width1)

             		    console.log("Segundo termino W " + width2)

             		    console.log("Ancho es de : "+width+"| Donde se pico fue X="+pagexxx+" ||| Alto es de:" + height +" | Donde se pico fue Y="+pageyyy+" id es:"+ id)

             		    if (width > height || width == height) {
             		    	console.log("Ancho es mas grande")
             		    	if (pagexxx < width1) {
             		    		console.log("Entro a Primer termino W")
             		    		ancho = "141%"
             		    	}

             		    	if (pagexxx < width2 && pagexxx > width1) {
             		    		console.log("Entro a Segundo termino W")
             		    		ancho = "center"
             		    	}

             		    	if (pagexxx > width2) {
             		    		console.log("Entro a Tercero termino W")
             		    		ancho = "-31%"
             		    	}

             		    	if (pageyyy < height1) {
             		    		console.log("Entro a Primer termino H")
             		    		alto = "80%"
             		    	}

             		    	if (pageyyy < height2 && pageyyy > height1) {
             		    		console.log("Entro a Segundo termino H")
             		    		alto = "center"
             		    	}

             		    	if (pageyyy > height2) {
             		    		console.log("Entro a Tercero termino H")
             		    		alto = "12%"
             		    	}

             		    	$(id).css({"mask": "url(http://fhorandremon.com/cosas/Killdainternet2/img/bullet_color_3.png)", "-webkit-mask" : "url(http://fhorandremon.com/cosas/Killdainternet2/img/bullet_color_3.png) "+ancho+" "+alto+" / 150%"})
             		    }

             		    if (width < height) {
             		    	console.log("Alto es mas grande")
             		    	if (pagexxx < width1) {
             		    		console.log("Entro a Primer termino W")
             		    		ancho = "133%"
             		    	}

             		    	if (pagexxx < width2 && pagexxx > width1) {
             		    		console.log("Entro a Segundo termino W")
             		    		ancho = "center"
             		    	}

             		    	if (pagexxx > width2) {
             		    		console.log("Entro a Tercero termino W")
             		    		ancho = "-30%"
             		    	}

             		    	if (pageyyy < height1) {
             		    		console.log("Entro a Primer termino H")
             		    		alto = "159%"
             		    	}

             		    	if (pageyyy < height2 && pageyyy > height1) {
             		    		console.log("Entro a Segundo termino H")
             		    		alto = "center"
             		    	}

             		    	if (pageyyy > height2) {
             		    		console.log("Entro a Tercero termino H")
             		    		alto = "-52%"
             		    	}

             		    	$(id).css({"mask": "url(http://fhorandremon.com/cosas/Killdainternet2/img/bullet_color_3.png)", "-webkit-mask" : "url(http://fhorandremon.com/cosas/Killdainternet2/img/bullet_color_3.png) "+ancho+" "+alto+" / 150%"})
             		    	
						}

         		  	});  
   
	          })

	          console.log("Termino de busqueda")
	        }

		    var busqueda = ""

		    function iniciar_busqueda(){

		    				busqueda = removeTags($("#buscar").val())

		    				busqueda = busqueda.replace(/[^\w\s]/gi, '')

		    				if (busqueda == "" || busqueda == null) {
		    					console.log("Por favor ingresa una busqueda")
		    					banderaenter = 0
		    					return false;
		    				}

		    				busqueda = busqueda + " png"

		    				$.ajax({
		    				  method: "GET",
		    				  url: "https://www.googleapis.com/customsearch/v1",
		    	  			  datatype: "json",
		    				  data: {
		    				  	"q" : busqueda,
		    				  	"cx" : "007883517099138897671:tnhuys7pn8g",
		    				  	"imgSize" : "medium",
		    				  	"safe" : "off",
		    				  	"searchType" : "image",
		    				  	"key" : "AIzaSyC4rowKK7FstBI2L9XkxaSExu3AbpDeIPc",
		    				  },
		    			        success: function(response) {
		    			        	console.log("Resulto")
		    			        	console.log(response)
		    			        	hndlr(response)
	         						 return true;
		    			        },
		    			        error:function(response){
		    			        	console.log("No resulto")
		    			        	console.log(response)
		    			        }

		    				})
		    }

		    var banderaenter = 0

		    $(document).keypress(function(e) {
		        if(e.which == 13 && banderaenter == 0) {

		        console.log("entro a enter")
		            iniciar_busqueda()
		            banderaenter = 1
		        }
		    })



		    $("#boton_buscar").click(function(){
		    	iniciar_busqueda()
		    })

		    $("#reset").click(function(){
		    	console.log("Entro a reset")
		    	$("#menu").fadeIn()
               	$("#content").fadeOut()
               	$("#content").empty()
               	busqueda = ""
               	banderaenter = 0
		    })

		    $("#buscar").focus();



	})