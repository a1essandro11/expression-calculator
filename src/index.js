function expressionCalculator(expr) {

    expr = expr.replace(/ /g, '').replace(/-/g, 'minus');

    let openedBrackets = 0;
    let closedBrackets = 0;

    expr.split('').forEach(item => {
        switch (item) {
            case '(':
                openedBrackets++;
                break;

            case ')':
                closedBrackets++;
                break;
        }
    });

    if (openedBrackets !== closedBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    const parseBrackets = (expr) => {

        if (expr.lastIndexOf('(') >= 0) {
            let firstBracketIndex = expr.lastIndexOf('(');
            let lastBracketIndex = expr.indexOf(')', firstBracketIndex + 1);
            let exprInsideBrackets = expr.slice(firstBracketIndex + 1, lastBracketIndex);
            let result = parseFloat(calculatePlus(exprInsideBrackets));

            if (!isFinite(result)) {
                throw new Error("TypeError: Division by zero.");
            }

            expr = expr.replace('(' + exprInsideBrackets + ')', result);

            return parseBrackets(expr);
        }

        return calculatePlus(expr);
    }

    const calculatePlus = (expr) => {
        return expr.split('+')
            .map(item => calculateMinus(item))
            .reduce((acc, item) => Number(acc) + Number(item));
    };

    const calculateMinus = (expr) => {
        return expr.split('minus')
            .map(item => calculateMultiply(item))
            .reduce((acc, item) => acc - item);
    };

    const calculateMultiply = (expr) => {
        return expr.split('*')
            .map(item => calculateDivide(item))
            .reduce((acc, item) => acc * item);
    };

    const calculateDivide = (expr) => {
        return expr.split('/')
            .reduce((acc, item) => acc / item);
    };

    if (!isFinite(parseBrackets(expr))) {
        throw new Error("TypeError: Division by zero.");
    }

    return parseBrackets(expr);

}

module.exports = {
    expressionCalculator
}