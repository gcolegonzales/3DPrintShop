import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import ProductList from "./ProductList";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia
                title={product.name}
                component="img"
                image={product.pictureUrl}
                alt="Product Img"
                sx={{ backgroundSize: "contain", bgcolor: "primary.light" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color="text.secondary" component="div">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}