- todo o funcionamento do teste inicia-se na linha 115 com a execução da função getCssAvailableList();

- getCssAvailableList, tem a finalidade de obter da lista total de CS's, apenas os que estão disponiveis para o processamento.

- hasMinCssQuantityAvailable, tem a finalidade de verificar se a metade ou mais da lista CS's estão disponiveis para o processamento.

- getCssListConfig, é o 'core', tem como objetivo obter cada possivel customer que cada CS's pode atender, levando em conta o valor do score do CS processado anteriormente. Ela irá retornar uma lista de CS's com a quantidade de clientes que cada um deles atende.

- getCssWithMoreCustomers, tem como objetivo calcular e retornar o CS's com o maior numero de customers em atendimento.

- sortListbyProperty, faz um sort na lista usando alguma propriedade.

- checkTieAttendance, verifica se existe algum CS que 'empata' com algum outro CS em numero de atendimento.

- filterCustomerListByScore, filtra pelo 'score' uma quantidade de customers.

- getCustomerScoreListValues, retorna uma lista de numeros (score) de um determinado grupo.
