import React from "react";
import Style from "./Shop.module.css";
import Card from "../../atoms/Card/Card";

const Shop = () => {
    return (<div className={Style.shopList}>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://boutique.elysee.fr/2027-superlarge_default/boules-de-petanque-rf-elysee-x-obut.jpg"
                  action="rien" libAction="jsp"/>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://www.media13-photo.com/7539-large_default/sacoche-boules-de-petanque-personnalisee.jpg"
                  action="rien" libAction="jsp"/>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://www.kdo66.com/3284-home_default/sacoche-pour-boules-de-petanque-personnalisable-avec-photo-et-texte.jpg"
                  action="rien" libAction="jsp"/>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://www.kdo66.com/3286-large_default/sacoche-pour-boules-de-petanque-personnalisable-avec-photo-et-texte.jpg"
                  action="rien" libAction="jsp"/>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://images-eu.ssl-images-amazon.com/images/I/719ozZTDu3S._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                  action="rien" libAction="jsp"/>
            <Card title="yeah" description="je fais un test pour afficher mes belles boullasse"
                  image="https://images-eu.ssl-images-amazon.com/images/I/71Ds5eut56L._SLDPMOBCAROUSELAUTOCROP288221_MCnd_AC_SR462,693_.jpg"
                  action="rien" libAction="jsp"/>
        </div>
    )
}

export default Shop;