/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { PropsWithChildren, ReactElement, useState } from 'react';
import {
    Button,
    Select,
    TextField,
    MenuItem,
    FormControl,
    FormControlLabel,
    InputLabel,
    Checkbox,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import styles from './AddDialog.module.css';

export function AddDialog(props: PropsWithChildren<any>): ReactElement {
    const [text, setText] = useState('');
    const [fileType, setFileType] = useState('text');
    const [parent, setParent] = useState(0);
    const [droppable, setDroppable] = useState(false);

    const handleChangeText = (e: any): void => {
        setText(e.target.value);
    };

    const handleChangeParent = (e: any): void => {
        setParent(Number(e.target.value));
    };

    const handleChangeDroppable = (e: any): void => {
        setDroppable(e.target.checked);
    };

    const handleChangeFileType = (e: any): void => {
        setFileType(e.target.value);
    };

    return (
        <Dialog open={true} onClose={props.onClose}>
            <>
                <DialogTitle>Add New Node</DialogTitle>

                <DialogContent className={styles.content}>
                    <div>
                        <TextField label="Text" onChange={handleChangeText} value={text} />
                    </div>

                    <div>
                        <FormControl className={styles.select}>
                            <InputLabel>Parent</InputLabel>

                            <Select label="Parent" onChange={handleChangeParent} value={parent}>
                                <MenuItem value={0}>(root)</MenuItem>
                                {props.tree
                                    .filter((node: Record<string, any>) => node.droppable === true)
                                    .map((node: Record<string, any>) => (
                                        <MenuItem key={node.id} value={node.id}>
                                            {node.text}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <FormControlLabel
                            control={<Checkbox checked={droppable} onChange={handleChangeDroppable} color="primary" />}
                            label="Droppable"
                        />
                    </div>

                    {!droppable && (
                        <div>
                            <FormControl className={styles.select}>
                                <InputLabel>File type</InputLabel>

                                <Select label="FileType" onChange={handleChangeFileType} value={fileType}>
                                    <MenuItem value="text">TEXT</MenuItem>

                                    <MenuItem value="csv">CSV</MenuItem>

                                    <MenuItem value="image">IMAGE</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClose}>Cancel</Button>

                    <Button
                        disabled={text === ''}
                        onClick={(): void =>
                            props.onSubmit({
                                text,
                                parent,
                                droppable,
                                data: {
                                    fileType
                                }
                            })
                        }
                    >
                        Submit
                    </Button>
                </DialogActions>
            </>
        </Dialog>
    );
}
