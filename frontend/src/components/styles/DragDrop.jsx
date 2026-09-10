import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';

export function DragDrop() {

    const [itens, setItens] = useState([
        { id: '1', content: 'Item 1' },
        { id: '2', content: 'Item 2' },
        { id: '3', content: 'Item 3' },
    ]);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        const novaLista = Array.from(itens);

        const [itemReordenado] = novaLista.splice(result.source.index, 1);

        novaLista.splice(result.destination.index, 0, itemReordenado);

        setItens(novaLista);

    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="aFazer">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} >
                        {itens.map((item, index) => (

                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided) => (
                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>{item.content}</li>
                                )}
                            </Draggable>
                        ))}


                    </ul>
                )}
            </Droppable>




        </DragDropContext>
    );
}