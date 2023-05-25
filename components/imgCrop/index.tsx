import { FC, HTMLAttributes, memo, ReactNode } from 'react';
import Cropper from 'react-cropper';

interface ImgCropProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  className?: string;
  imgsrc?: string;
  aspect?: number;
  onChange?: (e: any) => void;
  onCrop?: (e: any) => void;
}

const ImgCrop: FC<ImgCropProps> = memo((props: ImgCropProps) => {
  // const getCropData = () => {
  //   if (typeof cropper !== 'undefined') {
  //     setCropData(cropper.getCroppedCanvas().toDataURL());
  //     props.onCrop
  //       ? props.onCrop(cropper.getCroppedCanvas().toDataURL())
  //       : null;
  //   }
  // };

  return (
    <Cropper
      className={`imgCrop ${props.className} `}
      shape="round"
      zoomTo={0.5}
      zoomable={false} // 是否允许放大图像
      preview=".img-preview"
      src={props.imgsrc}
      viewMode={1}
      minCropBoxHeight={10}
      minCropBoxWidth={10}
      background={false} // 是否显示背景的马赛克
      responsive={true}
      autoCropArea={1}
      rotatable={false}
      aspectRatio={props.aspect || 1 / 1}
      checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
      onInitialized={(instance: any) => {
        props.onCrop ? props.onCrop(instance) : null;
      }}
      // guides={true} // 显示在裁剪框上方的虚线
      {...props}
    />
  );
});

ImgCrop.displayName = 'ImgCrop';

export default ImgCrop;
