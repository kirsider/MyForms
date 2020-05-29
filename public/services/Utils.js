const Utils = { 
    //  Parse a url and break it into resource, id and verb
    parseRequestURL : () => {

        let url = location.hash.slice(1) || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]

        return request
    },
    
    sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    createSnackbar: (function() {

        var prevs = [];

        return function (message) {
            var snackbar = document.createElement('div');
            snackbar.className = 'snackbar';
         
            var text = document.createTextNode(message);
            snackbar.appendChild(text);
            
            snackbar.addEventListener('transitionend', function (event, elapsed) {
                if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                    this.parentElement.removeChild(this);
                    prevs.shift();
                    
                    if (prevs[0]) {
                        setTimeout(function () {
                            this.style.opacity = 0;
                        }.bind(prevs[0]), 3000);

                        document.body.appendChild(prevs[0]);
                        
                        getComputedStyle(prevs[0]).bottom;
                        prevs[0].style.bottom = '0px';
                        prevs[0].style.opacity = 1;
                    }
                }
            }.bind(snackbar));
            
            if (prevs.length == 0) {
                setTimeout(function () {
                    this.style.opacity = 0;
    
                }.bind(snackbar), 3000);

                document.body.appendChild(snackbar);
                
                getComputedStyle(snackbar).bottom;
                snackbar.style.bottom = '0px';
                snackbar.style.opacity = 1;
                prevs.push(snackbar);
            } else {
                prevs.push(snackbar);
            }
        };
    })()
    
}

export default Utils; 