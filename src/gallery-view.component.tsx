import { Composite, ImageValue, ImageView, Properties, Button, Popover } from 'tabris';
import { component, property, ListView, Cell, inject } from 'tabris-decorators';

import { CameraViewComponent } from './camera-view.component';
import { DetailViewComponent } from './detail-view.component';

import { ImageService } from './image.service';

@component
export class GalleryViewComponent extends Composite {

    @property public stringList: ImageValue[] = ['https://socialistmodernism.com/wp-content/uploads/2017/07/placeholder-image.png?w=640'];

    constructor(
        properties: Properties<GalleryViewComponent>,
        @inject private imageService: ImageService
    ) {
        super();
        this.set(properties);

        this.listenToImageChanges();

        this.initView();
    }

    private initView(): void {
        this.append(
            <$>
                <ListView stretch bind-items='stringList' onSelect={({ item }: { item: ImageValue }) => this.toggleDetailView(item)}>
                    <Cell padding={15} selectable={true}>
                        <ImageView centerX height={250} width={250} cornerRadius={25} scaleMode='fill' bind-image='item'></ImageView>
                    </Cell>
                </ListView>
                <Button centerX bottom={15} height={50} width={150} cornerRadius={15} style='elevate' onSelect={() => this.toggleCameraView()}>
                    Open Camera
                </Button>
            </$>
        );
    }

    private listenToImageChanges(): void {
        this.imageService.onImagesChanged(() => {
            this.stringList = this.imageService.images;
        });
    }

    private toggleDetailView(image: ImageValue): void {
        const popover = Popover.open(
            <Popover>
                <DetailViewComponent stretch image={image} onDismissedChanged={() => popover.close()}></DetailViewComponent>
            </Popover>
        );
    }

    private toggleCameraView(): void {
        const popover = Popover.open(
            <Popover>
                <CameraViewComponent stretch onDismissedChanged={() => popover.close()}></CameraViewComponent>
            </Popover> 
        );
    }

}