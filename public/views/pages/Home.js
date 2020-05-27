let Home = {
    render: async () => {
        let view = `
        <div class="box">
        <a href="/#/newform">
          <div class="create-form-box">
          </div>
          New Form
        </a>
      </div>
  
      <div class="templates-box">
        <h3>Your Forms</h3>
        <div class="grid-wrapper">
          <a href="/Form.html">1</a>
          <a href="t2.html">2</a>
          <a href="t3.html">3</a>
          <a href="t4.html">4</a>
        </div>
  
      </div>
        `;
        return view;
    }, 
    
    after_render: async () => {

    }

}

export default Home;