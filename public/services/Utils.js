const Utils = { 
    //  Parse a url and break it into resource, id and verb
    parseRequestURL : () => {

        let url = location.hash.slice(1) || '/';
        let r = url.split("/");

        let request = {
            resource: null,
            id: null,
            verb: null
        };

        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];

        return request;
    },
    
    createSnackbar: (function() {
        let queue = [];

        return function (message) {
            let snackbar = document.createElement('div');
            snackbar.className = 'snackbar';
         
            let text = document.createTextNode(message);
            snackbar.appendChild(text);
            
            snackbar.addEventListener('transitionend', function (event, elapsed) {
                if (event.propertyName === 'opacity' && this.style.opacity == 0) {
                    this.parentElement.removeChild(this);
                    queue.shift();
                    
                    if (queue[0]) {
                        setSnackabrBehavior(queue[0]);
                    }
                }
            }.bind(snackbar));
            
            if (queue.length == 0) {
                setSnackabrBehavior(snackbar);
            }

            queue.push(snackbar);
        };
    })()

}

function setSnackabrBehavior(snackbar) {
    setTimeout(function () {
        this.style.opacity = 0;

    }.bind(snackbar), 3000);

    document.body.appendChild(snackbar);
    
    getComputedStyle(snackbar).bottom;
    snackbar.style.bottom = '0px';
    snackbar.style.opacity = 1;
}

export default Utils; 