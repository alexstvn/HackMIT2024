function addName() {
    var node = document.createElement("LI");
    var textnode = document.createTextNode(document.getElementById("step1-name").value);
    node.appendChild(textnode);
    document.getElementById("step1-namelist").appendChild(node);
}