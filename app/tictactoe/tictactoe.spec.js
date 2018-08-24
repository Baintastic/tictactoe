describe('boardController', function () {
    beforeEach(module('app'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('game', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('boardController', { $scope: $scope });
        });

        it('should create a board with three rows', (function () {
            expect($scope.board.length).toBe(3);
        }));

        it('should specify when a cell is taken', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'X' }],
                [{ value: '-' }, { value: 'X' }, { value: '-' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'O' }]
            ];
            var cell = $scope.board[0][1];
            var actual = $scope.isTaken(cell);
            expect(actual).toBe(true);
        }));

        it('should change the current players turn after a move is made', (function () {
            $scope.currentPlayer = 'O'
            $scope.board = [
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                [{ value: '-' }, { value: 'X' }, { value: '-' }],
                [{ value: '-' }, { value: 'O' }, { value: 'O' }]
            ];
            var cell = $scope.board[1][0];
            $scope.move(cell);
            var actual = $scope.currentPlayer;
            expect(actual).toBe('X');
        }));
    });

    describe('$scope.reset', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('boardController', { $scope: $scope });
        });

        it('should set all the values on the grid to - when reset is run', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'X' }],
                [{ value: '-' }, { value: 'X' }, { value: '-' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'O' }]
            ];
            $scope.reset();
            expect($scope.board[0][0].value).toBe('-');
            expect($scope.board[0][1].value).toBe('-');
            expect($scope.board[0][2].value).toBe('-');
            expect($scope.board[1][0].value).toBe('-');
            expect($scope.board[1][1].value).toBe('-');
            expect($scope.board[1][2].value).toBe('-');
            expect($scope.board[2][0].value).toBe('-');
            expect($scope.board[2][1].value).toBe('-');
            expect($scope.board[2][2].value).toBe('-');
        }));

        it('should set the game details to false', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'X' }],
                [{ value: '-' }, { value: 'X' }, { value: '-' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'O' }]
            ];
            $scope.reset();
            expect($scope.winner).toBe(false);
            expect($scope.draw).toBe(false);
            expect($scope.cellTaken).toBe(false);
            expect($scope.gameOver).toBe(false);

        }));
    });

    describe('$scope.checkForEndOfGame', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('boardController', { $scope: $scope });
        });

        it('should return true and have a winner when all markers are horizontally the same', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'X' }],
                [{ value: '-' }, { value: 'X' }, { value: '-' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'O' }]
            ];
            var actual = $scope.checkForEndOfGame();
            expect(actual).toBe(true);
            expect($scope.winner).toBe(true);
        }));

        it('should return true and have a winner when all markers are vertically the same', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'X' }],
                [{ value: '-' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'X' }]
            ];
            var actual = $scope.checkForEndOfGame();
            expect(actual).toBe(true);
            expect($scope.winner).toBe(true);
        }));

        it('should return true and have a winner when all markers are diagonally the same', (function () {
            $scope.board = [
                [{ value: '-' }, { value: 'X' }, { value: 'O' }],
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'X' }]
            ];
            var actual = $scope.checkForEndOfGame();
            expect(actual).toBe(true);
            expect($scope.winner).toBe(true);
        }));

        it('should return true in a draw when there are no more cells to choose from', (function () {
            $scope.board = [
                [{ value: 'X' }, { value: 'X' }, { value: 'O' }],
                [{ value: 'O' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }]
            ];
            var actual = $scope.checkForEndOfGame();
            expect(actual).toBe(true);
            expect($scope.outOfMoves()).toBe(true)
            expect($scope.draw).toBe(true);
        }));

    });





});