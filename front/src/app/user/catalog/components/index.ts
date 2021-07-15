import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { UserComponentsModule } from '../../components/index.module';
import { SharedModule } from '@shared/shared.module';
import { EditAddProductComponent } from './edit-add-product/edit-add-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { ReplaceCatalogComponent } from './replace-catalog/replace-catalog.component';
import { FileLoaderComponent } from './file-loader/file-loader.component';
import {MyPipesModule} from "@shared/pipes/my-pipes.module";
import {FormsModule} from "@angular/forms";


type ComponentsType =
  typeof EditAddProductComponent |
  typeof DeleteProductComponent |
  typeof ReplaceCatalogComponent |
  typeof FileLoaderComponent;

const components : ComponentsType[] = [
  EditAddProductComponent,
  DeleteProductComponent,
  ReplaceCatalogComponent,
  FileLoaderComponent
];

@NgModule({
  declarations: [ components ],
  imports: [
    MatDialogModule,
    UserComponentsModule,
    SharedModule,
    CommonModule,
    NgxDropzoneModule,
    MyPipesModule,
  ],
  exports: [ components ]
})
export class CatalogComponentsModule {}
