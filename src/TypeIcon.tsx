import React, { PropsWithChildren } from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function TypeIcon(props: PropsWithChildren<any>) {
    if (props.droppable) {
        return <FolderIcon />;
    }

    switch (props.fileType) {
        case 'image':
            return <ImageIcon />;
        case 'csv':
            return <ListAltIcon />;
        case 'text':
            return <DescriptionIcon />;
        default:
            return null;
    }
}
