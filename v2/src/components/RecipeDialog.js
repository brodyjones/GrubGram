import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RecipeContent from "./RecipeContent";

export default function RecipeDialog({ recipe }) {
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    if (!recipe) {
        return (
            <Button variant="outlined">
                Recipe
            </Button>
        );
    } else {
        return (
            <div>
                <Button variant="contained" onClick={handleClickOpen('paper')}>
                    Recipe
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    scroll={scroll}
                >
                    <DialogTitle >{recipe.name}</DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <DialogContentText
                            ref={descriptionElementRef}
                            tabIndex={-1}
                        >
                            <RecipeContent recipe={recipe} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

}