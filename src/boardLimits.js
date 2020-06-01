class BoardLimits {
    constructor(ctx) {
        this.ctx = ctx

        this.x1 = 0
        this.y1 = 0
        this.w1 = 800
        this.h1 = 50

        this.x2 = 0
        this.y2 = 0
        this.w2 = 50
        this.h2 = 800

        this.x3 = 0
        this.y3 = 750
        this.w3 = 800
        this.h3 = 50

        this.x4 = 750
        this.y4 = 0
        this.w4 = 50
        this.h4 = 350

        this.x5 = 750
        this.y5 = 450
        this.w5 = 50
        this.h5 = 450

    }
    draw() {
        this.ctx.strokeRect(
            this.x1,
            this.y1,
            this.w1,
            this.h1
        )

        this.ctx.strokeRect(
            this.x2,
            this.y2,
            this.w2,
            this.h2

        )

        this.ctx.strokeRect(
            this.x3,
            this.y3,
            this.w3,
            this.h3
        )

        this.ctx.strokeRect(
            this.x4,
            this.y4,
            this.w4,
            this.h4
        )

        this.ctx.strokeRect(
            this.x5,
            this.y5,
            this.w5,
            this.h5
        )
    }
}