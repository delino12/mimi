/**
* Author: Ekpoto Liberty
* @delino12 | #code_dreamer
*/


const Jquery = require("./Jquery");
class Mimi {
	constructor(query){
		if(!query.api_key) throw new Error("Mimi require `api_keys` provide one or see Mimi docs!");
		this.api_key = query.api_key;
		
		if(!query.hook) throw new Error("Mimi require a web `hook` provide one or see Mimi docs");
		this.hook = query.hook;
		
		// initialize mimi no timer
		// this.__close();
		this.__init(this.api_key);
		this.listen(this.api_key, this.hook);
		// this.__open();
	}

	__init(api_key){
		// verify api keys
		this.__auth(api_key).then(function (val){
			// console log value
			console.log(val);
			if(val.status == "success"){

			}
		}).catch(function (err){
			console.log(err);
		});
	}

	__createNewElement(){
		this.mimiWrapper = document.createElement("div");
	  	this.mimiWrapper.classList.add("mimi-wrapper");
	  	this.mimiWrapper.setAttribute("id", "mimi-wrapper");
	  	this.mimiWrapper.setAttribute("hidden", "");
	  	document.body.appendChild(this.mimiWrapper);

	  	document.getElementById("mimi-wrapper").innerHTML = `
	  		<div align="right">
	  			<a href="javascript:void(0);" id="close-mimi">
	  				close
	  			</a>
	  		</div>
			<div id="mimi-form">
				<form onsubmit="return false">
					<div class="mimi-input">
						<h4>
							<i class="fa fa-lightbulb-o"></i> Hi, You can report software issues here!
						</h4>
					</div>
					<div class="mimi-input">
						<textarea class="mimi-textarea" id="mimi-text" cols="47" rows="5" placeholder="Type a message..."></textarea>
					</div>
					<div class="mimi-input">
						<button class="mimi-btn" id="mimi-btn" type="submit">
							<i class="fa fa-envelope"></i> Send Report
						</button>
					</div>
				</form>
			</div>
			<div id="form-message"></div>
	  	`;

	  	// open a new bug issue
	  	this.__open();
	}

	__auth(api_key){
	  	return new Promise(function(resolve, reject) {
		  if(api_key === "CI-3hsyy326skiia7s734"){
		  	resolve({
		  		status: "success",
		  		message: " 🐛 Mimi is ready to help send your bug request!"
		  	});
		  }else{
		  	reject({
		  		status: "error",
		  		message: "Invalid api key"
		  	});
		  }
		});
	}

	__close(){

	}

	__open(){
		this.bugBtn = document.createElement("div");
		this.bugBtn.setAttribute("id", "btn-div");
		document.body.appendChild(this.bugBtn);
		document.getElementById("btn-div").innerHTML = `
			<a href="javascript:void(0);" id="mimi-pop-form" class="mimi-tips">
				<i class="fa fa-bug fa-2x"></i>
			</a>
		`;
		document.getElementById("mimi-pop-form").addEventListener("click", function(c){
			$("#mimi-wrapper").toggle();
		});

		document.getElementById("close-mimi").addEventListener("click", function(c){
			$("#mimi-wrapper").fadeOut();
		})
	}

	listen(api_key, url){
		this.__createNewElement();
		document.getElementById("mimi-btn").addEventListener("click", function(c){
			var sendBtn = document.getElementById("mimi-btn").innerHTML = `
				<i class="fa fa-envelope"></i> Sending Report....
			`;
			var message = document.getElementById("mimi-text").value;
			if(message == ""){
				document.getElementById("form-message").innerHTML = `
					<br />
					<div class="mimi-error-alert">
						Type an issue...
					</div>
				`;

				document.getElementById("mimi-btn").innerHTML = `<i class="fa fa-envelope"></i> Send Report`;
			}else{

				// send reports
				// alert(message);
				var params = {
					software_name: "none",
					software_key: api_key,
					software_issue: message,
					software_status: "none",
					reporter_ip: "none",
					reporter_browser: "none",
					reporter_location: "none"
				};

				$.post(url, params, function(data, textStatus, xhr) {
					/*optional stuff to do after success */

					if(data.status == "success"){
						document.getElementById("mimi-form").style.display = 'none';
						document.getElementById("form-message").innerHTML = `
							<br />
							<center>
								<img src="https://cheekymunkey.co.uk/wp-content/uploads/2017/12/itsupp.png" class="tech-image" width="160" height="auto" />
							</center>
							<div class="mimi-success-alert">
								<h4>Report sent!</h4>
								${data.message}.
							</div>
						`;

						// set timeout
						setTimeout(function (){
							document.getElementById("mimi-wrapper").style.display = "none";
						}, 3000);

						document.getElementById("mimi-btn").innerHTML = `<i class="fa fa-envelope"></i> Send Report`;
					}else{
						document.getElementById("form-message").innerHTML = `
							<br />
							<div class="mimi-error-alert">
								${data.message}
							</div>
						`;

						document.getElementById("mimi-btn").innerHTML = `<i class="fa fa-envelope"></i> Send Report`;
					}
				});	
			}
		});
	}
}
window.Jquery = Jquery;
window.Mimi = Mimi;