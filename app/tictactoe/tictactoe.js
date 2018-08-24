
    angular
    .module('app', [])
    .controller('boardController', function boardController($scope) {
        var createEmptyBoard = function($scope) {
            $scope.board = [];
            for (var i = 0; i <= 2; i++) {
                var row = [];
                for (var j = 0; j <= 2; j++) {
                    var col = { value: '-' };
                    row.push(col);
                }
                $scope.board.push(row);
            }
        }

        var checkForMatch = function (cell1, cell2, cell3) {
            return cell1.value === cell2.value &&
                cell1.value === cell3.value &&
                cell1.value !== '-';
        };

        var gameNotOver = function($scope){
            return $scope.checkForEndOfGame() === false;
        } 

        $scope.reset = function () {
            $scope.gameOver = false;
            $scope.currentPlayer = 'X';
            $scope.cellTaken = false;
            $scope.winner = false;
            $scope.draw = false;
            createEmptyBoard($scope);
        };
        $scope.reset();

        $scope.isTaken = function (cell) {
            return cell.value !== '-';
        };

        $scope.outOfMoves = function () {
            for (var row = 0; row <= 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if ($scope.board[row][col].value === '-') {
                        return false;
                    }
                }
            }
            return true;
        };

        $scope.checkForEndOfGame = function () {
            var board = $scope.board;
            var horizontalWin = checkForMatch($scope.board[0][0], $scope.board[0][1], $scope.board[0][2]) || checkForMatch($scope.board[1][0], $scope.board[1][1], $scope.board[1][2]) || checkForMatch($scope.board[2][0], $scope.board[2][1], $scope.board[2][2]);
            var verticallWin = checkForMatch($scope.board[0][0], $scope.board[1][0], $scope.board[2][0]) || checkForMatch($scope.board[0][1], $scope.board[1][1], $scope.board[2][1]) || checkForMatch($scope.board[0][2], $scope.board[1][2], $scope.board[2][2]);
            var diagonalWin = checkForMatch($scope.board[0][0], $scope.board[1][1], $scope.board[2][2]) || checkForMatch($scope.board[0][2], $scope.board[1][1], $scope.board[2][0]);

            $scope.winner = horizontalWin || verticallWin || diagonalWin;
            $scope.draw = ($scope.winner === false) && $scope.outOfMoves();
            return $scope.winner || $scope.draw;
        };

        $scope.move = function (cell) {
            if ($scope.isTaken(cell)) {
                $scope.cellTaken = true;
                return $scope.currentPlayer;
            }
            $scope.cellTaken = false;
            cell.value = $scope.currentPlayer;
            
            if (gameNotOver($scope)) {
                $scope.currentPlayer = $scope.currentPlayer === 'X' ? 'O' : 'X';
            }
            else {
                $scope.gameOver = true;
            }
          
        };
    })



