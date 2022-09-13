function navbar(){
    return `<div id="details">
    <h2 style="margin-right: 10px;"> <a href="index.html">Food Recipes</a> </h2>
    <input type="text" id="receipe" placeholder="Search Recipe">
    <button id="button" >Search</button>
  </div>

  <div id="others">
    <h2> <a href="recipe.html">Receipe of the day</a> </h2>

  </div>

  <div id="user">

    <h2> <a href="signup.html">Signup</a> </h2>
    <h2> <a href="login.html">Login</a> </h2>

  </div>
</div>`
}

export default navbar;