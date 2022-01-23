import { Camera, Composite, Properties, CameraView, Button, Popover } from "tabris";
import { component, inject, property } from "tabris-decorators";

import { CameraService } from "./camera.service";

@component
export class CameraViewComponent extends Composite {

    @property public camera: Camera;

    private popover = new Popover();


    constructor(
        properties: Properties<CameraViewComponent>,
        @inject private cameraService: CameraService
    ) {
        super();
        this.set(properties);

        this.initView();
    }

    private initView(): void {
        this.startCamera();

        this.popover.contentView.append(
            <$>
                <CameraView stretch camera={this.camera}></CameraView>
                <Button centerX bottom={35} height={50} width={150} cornerRadius={15} style='elevate' onSelect={() => this.captureImage()}>Take A Picture</Button>
                <Button left={5} height={50} cornerRadius={15} style='text' onSelect={() => this.changeCamera()}>Switch Camera</Button>
                <Button right={5} height={50} cornerRadius={15} style='text' onSelect={() => this.closeView()}>Cancel</Button>
            </$>
        );

        this.popover.open();
    }

    private startCamera(): void {
        this.cameraService.activateCamera();

        this.camera = this.cameraService.getCamera();
    }

    private changeCamera(): void {
        this.cameraService.switchCamera()
            .then(camera => { 
                this.camera = camera;

                this.popover.contentView.find(CameraView).only().camera = this.camera;
            });
    }

    private captureImage(): void {
        this.cameraService.captureImage();

        this.closeView();
    }

    private closeView(): void {
        this.popover.close();

        this.cameraService.deactiveCamera();

        this.dispose();
    }


}
