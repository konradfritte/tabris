import { permission, device, Camera } from "tabris";
import { inject, shared } from "tabris-decorators";
import { ImageService } from "./image.service";

@shared
export class CameraService {

    private camera = device.cameras[0];

    constructor(
        @inject private imageService: ImageService
    ) {

    }

    public getCamera(): Camera {
        return this.camera;
    }

    public activateCamera(): void {

        permission.requestAuthorization(
            'camera'
        )
            .then(_ => this.camera.active = true);
    }

    public deactiveCamera(): void {
        this.camera.active = false;
    }

    public async captureImage() {
        const { image } = await this.camera.captureImage();

        this.imageService.addImage(image);
    }

    public switchCamera(): void {
        this.camera = this.camera === device.cameras[0] ? device.cameras[1] : device.cameras[0];
    }
}