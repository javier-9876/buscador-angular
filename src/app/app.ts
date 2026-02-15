import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Destino {
  nombre: string;
  pais: string;
  continente: string;
  tipo: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  // Sigal crea una variable reactiva que con esta cuando se modifica su contenido se actualiza todo lo ralacionado con esta automaticamente
  title = signal('Buscador');

  destinos: Destino[] = [
    { nombre: 'París', pais: 'Francia', continente: 'Europa', tipo: 'Ciudad', precio: 800, imagen: 'https://cdn2.civitatis.com/francia/paris/galeria/torre-eiffel-altura.jpg' },
    { nombre: 'Roma', pais: 'Italia', continente: 'Europa', tipo: 'Ciudad', precio: 600, imagen: 'https://turismo20.com/wp-content/uploads/2020/05/coliseo-romano.png' },
    { nombre: 'Bali', pais: 'Indonesia', continente: 'Asia', tipo: 'Playa', precio: 1200, imagen: 'https://viajeronomada.com/wp-content/uploads/2022/06/dondealojarseenbali-800x534.jpg' },
    { nombre: 'Cancún', pais: 'México', continente: 'América', tipo: 'Playa', precio: 700, imagen: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt8fbf6273140a0c26/67e66f166d13e70e8e36ed8d/iStock-1342110118-Header_Mobile.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart' },
    { nombre: 'Machu Picchu', pais: 'Perú', continente: 'América', tipo: 'Montaña', precio: 950, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg/500px-Machu_Picchu%2C_Peru_%282018%29.jpg' },
    { nombre: 'Sidney', pais: 'Australia', continente: 'Oceanía', tipo: 'Ciudad', precio: 1300, imagen: 'https://www.civitatis.com/blog/wp-content/uploads/2018/01/vista-opera-house-sidney.jpg' },
    { nombre: 'Tokyo', pais: 'Japón', continente: 'Asia', tipo: 'Ciudad', precio: 1100, imagen: 'https://res.cloudinary.com/aenetworks/image/upload/c_fill,w_1200,h_630,g_auto/dpr_auto/f_auto/q_auto:eco/v1/gettyimages-1390815938' },
    { nombre: 'El Cairo', pais: 'Egipto', continente: 'África', tipo: 'Ciudad', precio: 500, imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Cairo_From_Tower_%28cropped%29.jpg/1280px-Cairo_From_Tower_%28cropped%29.jpg' },
    { nombre: 'Barcelona', pais: 'España', continente: 'Europa', tipo: 'Ciudad', precio: 650, imagen: 'https://images.contentstack.io/v3/assets/blt06f605a34f1194ff/blt6a75be1706ab3433/68ada634974c2b3079e6cb75/246171926_l-Header_Mobile.jpg?fit=crop&disable=upscale&auto=webp&quality=60&crop=smart' },
    { nombre: 'Costa Rica', pais: 'Costa Rica', continente: 'América', tipo: 'Aventura', precio: 900, imagen: 'https://wallpapers.com/images/hd/costa-rica-1500-x-1000-picture-coscf5bx6c7kv8ct.jpg' },
    { nombre: 'Santorini', pais: 'Grecia', continente: 'Europa', tipo: 'Playa', precio: 750, imagen: 'https://www.grecia.info/es/wp-content/uploads/sites/166/santorini-hd.jpg' },
    { nombre: 'Reikiavik', pais: 'Islandia', continente: 'Europa', tipo: 'Montaña', precio: 1050, imagen: 'https://media.traveler.es/photos/613768896936668f30c3e829/16:9/w_2560%2Cc_limit/162294.jpg' },
  ];

  busquedaTexto: string = '';
  filtroContinente: string = '';
  filtroTipo: string = '';
  filtroPrecio: string = '';

  getDestinosFiltrados(): Destino[] {
    return this.destinos.filter(destino => {
      // Filtro texto
      const texto = this.busquedaTexto.toLowerCase();
      if (texto && !destino.nombre.toLowerCase().includes(texto) && !destino.pais.toLowerCase().includes(texto)) {
        return false;
      }

      // Filtro continente
      if (this.filtroContinente && destino.continente !== this.filtroContinente) {
        return false;
      }

      // Filtro tipo
      if (this.filtroTipo && destino.tipo !== this.filtroTipo) {
        return false;
      }

      // Filtro precio
      if (this.filtroPrecio) {
        if (this.filtroPrecio === 'economico' && destino.precio >= 500) return false;
        if (this.filtroPrecio === 'moderado' && (destino.precio < 500 || destino.precio > 1000)) return false;
        if (this.filtroPrecio === 'premium' && destino.precio <= 1000) return false;
      }

      return true;
    });
  }

  resetFiltros(): void {
    this.busquedaTexto = '';
    this.filtroContinente = '';
    this.filtroTipo = '';
    this.filtroPrecio = '';
  }
}
