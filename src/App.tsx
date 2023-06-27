/* eslint-disable @typescript-eslint/restrict-plus-operands */
import React, { ReactElement, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Tree, MultiBackend, getDescendants, getBackendOptions } from '@minoru/react-dnd-treeview';
import { CustomNode } from './CustomNode';
import { CustomDragPreview } from './CustomDragPreview';
import { AddDialog } from './AddDialog';
import { theme } from './theme';
import styles from './App.module.css';
import SampleData from './sample_data.json';
import { EditDialog } from './EditDialog';

const getLastId = (treeData: Array<Record<string, any>>): number => {
    const reversedArray = [...treeData].sort((a, b) => {
        if (a.id < b.id) {
            return 1;
        }
        if (a.id > b.id) {
            return -1;
        }

        return 0;
    });

    if (reversedArray.length > 0) {
        return reversedArray[0].id;
    }

    return 0;
};

function App(): ReactElement {
    const [treeData, setTreeData] = useState(SampleData);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const handleDrop = (newTree: any): void => setTreeData(newTree);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({});

    const handleDelete = (id: number): void => {
        const deleteIds = [id, ...getDescendants(treeData, id).map((node) => node.id)];
        const newTree = treeData.filter((node) => !deleteIds.includes(node.id));

        setTreeData(newTree);
    };

    const handleEdit = (id: number): void => {
        // eslint-disable-next-line array-callback-return
        treeData.map((node) => {
            if (node.id === id) {
                setEditData(node);
            }
        });

        setOpenEdit(true);
    };
    const handleOpenDialog = (): void => {
        setOpen(true);
    };

    const handleCloseDialog = (): void => {
        setOpen(false);
        setOpenEdit(false);
    };

    const handleSubmit = (newNode: any): void => {
        const lastId = getLastId(treeData) + 1;

        setTreeData([
            ...treeData,
            {
                ...newNode,
                id: lastId
            }
        ]);

        setOpen(false);
    };

    const handleSubmitEdit = (modifiedNode: any): void => {
        const filteredTreeData = treeData.filter((node) => {
            return node.id !== modifiedNode.id;
        });

        setTreeData([
            ...filteredTreeData,
            {
                ...modifiedNode
            }
        ]);

        setOpenEdit(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
                <div className={styles.app}>
                    <div>
                        <Button onClick={handleOpenDialog} startIcon={<AddIcon />}>
                            Add Node
                        </Button>

                        {open && <AddDialog tree={treeData} onClose={handleCloseDialog} onSubmit={handleSubmit} />}

                        {openEdit && <EditDialog tree={treeData} onClose={handleCloseDialog} onSubmitEdit={handleSubmitEdit} editData={editData} />}
                    </div>
                    <Tree
                        tree={treeData}
                        rootId={0}
                        render={(node, options): any => <CustomNode node={node} {...options} onDelete={handleDelete} onEdit={handleEdit} />}
                        // eslint-disable-next-line react/no-unstable-nested-components
                        dragPreviewRender={(monitorProps): any => <CustomDragPreview monitorProps={monitorProps} />}
                        onDrop={handleDrop}
                        classes={{
                            root: styles.treeRoot,
                            draggingSource: styles.draggingSource,
                            dropTarget: styles.dropTarget
                        }}
                    />
                </div>
            </DndProvider>
        </ThemeProvider>
    );
}

export default App;
