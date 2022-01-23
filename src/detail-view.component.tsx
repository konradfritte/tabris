import { Composite, Popover, Properties, ImageView, ImageValue } from "tabris";
import { component, property } from "tabris-decorators";

@component
export class DetailViewComponent extends Composite {

    @property public image: ImageValue;

    private popover = new Popover();

    constructor(properties: Properties<DetailViewComponent>) {
        super();
        this.set(properties);

        this.initView();
    }

    private initView(): void {
        this.popover.contentView.append(
            <$>
                <ImageView
                    stretch
                    background="black"
                    image={this.image}
                    scaleMode='fit'
                    zoomEnabled={true}
                    onTap={() => this.closeView()}
                ></ImageView>
            </$>
        );

        this.popover.open();
    }

    private closeView(): void {
        this.popover.close();
        
        this.dispose();
    }
}