import React, { PropsWithChildren, ReactElement, useState } from 'react';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ArrowRight, Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { useDragOver } from '@minoru/react-dnd-treeview';
import { TypeIcon } from './TypeIcon';
import styles from './CustomNode.module.css';

export function CustomNode(props: PropsWithChildren<any>): ReactElement {
    const [hover, setHover] = useState(false);
    const { id, droppable, data } = props.node;
    const indent = props.depth * 24;

    const handleToggle = (e: any): void => {
        e.stopPropagation();
        props.onToggle(props.node.id);
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const dragOverProps = useDragOver(id, props.isOpen, props.onToggle);

    return (
        <div
            className={`tree-node ${styles.root}`}
            style={{ paddingInlineStart: indent }}
            {...dragOverProps}
            onMouseEnter={(): void => setHover(true)}
            onMouseLeave={(): void => setHover(false)}
        >
            <div className={`${styles.expandIconWrapper} ${props.isOpen ? styles.isOpen : ''}`}>
                {props.node.droppable && (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <div onClick={handleToggle}>
                        <ArrowRight />
                    </div>
                )}
            </div>

            <div>
                <TypeIcon droppable={droppable} fileType={data?.fileType} />
            </div>

            <div className={styles.labelGridItem}>
                <Typography variant="body2">{props.node.text}</Typography>
            </div>

            {hover && (
                <>
                    <div className={styles.actionButton}>
                        <IconButton size="small" onClick={(): void => props.onEdit(id)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </div>

                    <div className={styles.actionButton}>
                        <IconButton size="small" onClick={(): void => props.onDelete(id)}>
                            <Delete fontSize="small" />
                        </IconButton>
                    </div>
                </>
            )}
        </div>
    );
}
