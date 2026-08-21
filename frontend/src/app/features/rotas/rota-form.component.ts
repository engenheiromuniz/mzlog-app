import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Rota } from '../../core/models/rota.model';
import { Funcionario } from '../../core/models/funcionario.model';
import { Cliente } from '../../core/models/cliente.model';
import { FuncionariosService } from '../../core/services/funcionarios.service';
import { ClientesService } from '../../core/services/clientes.service';

@Component({
  selector: 'app-rota-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './rota-form.component.html',
})
export class RotaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<RotaFormComponent>);
  private funcionariosService = inject(FuncionariosService);
  private clientesService = inject(ClientesService);
  data = inject<Rota | null>(MAT_DIALOG_DATA);

  motoristas: Funcionario[] = [];
  clientes: Cliente[] = [];
  status = ['Planejada', 'Em andamento', 'Concluida'];

  form = this.fb.nonNullable.group({
    origem: [this.data?.origem ?? '', Validators.required],
    destino: [this.data?.destino ?? '', Validators.required],
    clienteId: [this.data?.clienteId ?? null, Validators.required],
    motoristaId: [this.data?.motoristaId ?? null, Validators.required],
    status: [this.data?.status ?? 'Planejada', Validators.required],
  });

  get titulo(): string {
    return this.data ? 'Editar rota' : 'Nova rota';
  }

  ngOnInit(): void {
    this.funcionariosService.listar().subscribe((res) => {
      this.motoristas = res.filter((f) => f.cargo.trim().toLowerCase() === 'motorista');
    });
    this.clientesService.listar().subscribe((res) => {
      this.clientes = res;
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    const motorista = this.motoristas.find((m) => m.id === valores.motoristaId);
    const cliente = this.clientes.find((c) => c.id === valores.clienteId);
    const rota: Rota = {
      origem: valores.origem,
      destino: valores.destino,
      clienteId: valores.clienteId as number,
      clienteNome: cliente?.nome ?? '',
      motoristaId: valores.motoristaId as number,
      motoristaNome: motorista?.nome ?? '',
      status: valores.status,
    };
    this.dialogRef.close(rota);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
