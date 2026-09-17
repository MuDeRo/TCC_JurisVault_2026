import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

// FLUXO GERAL: importar o componente DragDrop no arquivo onde ele será usado, criar um estado para armazenar os itens que serão arrastados, criar uma função handleOnDragEnd que será chamada quando o usuário terminar de arrastar um item, e dentro dessa função atualizar a lista de itens com a nova ordem. Por fim, renderizar o componente DragDropContext com a função handleOnDragEnd, e dentro dele renderizar o componente Droppable com a lista de itens, e para cada item renderizar o componente Draggable.

export function DragDrop() { // criação do componente DragDrop

    const [itens, setItens] = useState([ //usamos esse MOCK para testar a funcionalidade de drag and drop, futuramente será substituido por uma requisição ao backend

        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' },
    ]);

    const handleOnDragEnd = (result) => { // função que é chamada quando o usuário termina de arrastar um item 
        if (!result.destination) return; //se o item não foi arrastado para um destino válido, a função retorna sem fazer nada

        const novaLista = Array.from(itens); //atualiza a lista de itens com a nova ordem, removendo o item arrastado da posição original e inserindo-o na nova posição

        const [itemReordenado] = novaLista.splice(result.source.index, 1); //remove o item da posição original

        novaLista.splice(result.destination.index, 0, itemReordenado); //insere o item na nova posição

        setItens(novaLista); //atualiza o estado com a nova lista de itens, o que faz com que o componente seja re-renderizado com a nova ordem dos itens

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}> {/* chama o componente DragDropContext com a função handleOnDragEnd */}
            <Droppable droppableId="aFazer">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} > {/* chama o componente Droppable com o ID "aFazer" - a fazer é um exemplo, no projeto real a gente usaria as etapas dos processos */}
                        {itens.map((item, index) => (

                            <Draggable key={item.id} draggableId={item.id} index={index}> {/* chama o componente Draggable com o ID do item e o índice */}
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{item.content}</li>
                                )} {/* adiciona o item à lista */}
                            </Draggable>
                        ))}


                    </ul>
                )}
            </Droppable>




        </DragDropContext>
    );
}