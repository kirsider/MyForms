let Error404 = {

    render : async () => {
        let view =`
        <div class="form-box">
            <div class="form-header-box">
                <p>Page not found :(</p>
            </div>
        </div>
        `;
        return view
    }, 
    
    after_render: async () => {
    }
}

export default Error404;