const Style = `
  <style>
  body {
    background-image: linear-gradient(#000000, #021c3d);
    color: white;
    font-family: Arial, sans-serif; 
  }

    .navbar {
      background-color: #000;
    }

    .navbar-brand img {
      filter: invert(1);
    }

    .fade-in {
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .fade-in.active {
      opacity: 1;
    }

    .carousel-item img {
      border-radius: 10px;
      margin: 20px auto;
      display: block;
      width: 80%;
      max-width: 400px;
    }

    .carousel-caption {
      text-align: center;
    }

    footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 10px 0;
        background-color: #000;
        color: #fff;
      }
      .bolt-button {
        border: none;
        padding: 10px 20px;
        background-color: chocolate; 
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        outline: none;
      }
      
      .bolt-button:hover {
        background-color: #8b4513; 
      }

      .bolt-center {
        display: flex;
        justify-content: center;
      }  
      
  </style>`;

export {
    Style
}