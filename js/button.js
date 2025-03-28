class Button
{
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}

class CircleButton extends Button
{
    constructor(id, x, y, r) {
        super(id, x, y);
        this.radius = r;
    }

    isMouseOver(mouseX, mouseY) {
        return Math.pow(mouseX - this.x, 2) + Math.pow(mouseY - this.y, 2) < Math.pow(this.radius, 2);
    }
}

class RectButton extends Button
{
    constructor(id, x, y, w, h) {
        super(id, x, y);
        this.width = w;
        this.height = h;
    }

    isMouseOver(mouseX, mouseY) {
        return mouseX > this.x && mouseX < (this.x + this.width) && mouseY > this.y && mouseY < (this.y + this.height);
    }
}