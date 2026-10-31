Bugünün frontend dünyasında sürekli daha karmaşık uygulamalar geliştiriyoruz: iş mantığı, arayüz bileşenleri ve framework’e özgü kod birbirine dolanıyor; bu da sistemlerimizi katı ve bakımı zor hâle getiriyor. Robert C. Martin’in bunu anlatışını çok seviyorum: “Yazılım, ‘yumuşak’ olsun diye icat edildi. Makinelerin davranışını kolayca değiştirmenin bir yolu olarak tasarlandı. Makinelerin davranışının değiştirilmesi zor olsaydı, ona donanım derdik.” Gelin, Clean Architecture ilkelerinin modern frontend geliştirmede gerçekte nasıl işleyebileceğini; bakımı kolay, test edilebilir ve framework’ten bağımsız uygulamalara götüren gerçek desenler ve pratiklerle birlikte inceleyelim. Teknik Borç ve Pazar Baskısının Gerçekliği Hepimiz bunu daha önce duymuşuzdur: “Sonra temizleriz, yeter ki önce pazara çıkalım!” Ama dürüst olalım: hiçbir şey sonradan temizlenmez, çünkü pazar baskıları öylece ortadan kaybolmaz. “Gerçek şu ki, dağınıklık yaratmak her zaman temiz kalmaktan daha yavaştır; hangi zaman ölçeğine bakarsanız bakın.”

## Teknik Borç ve Pazar Baskısının Gerçekliği

> “Bu geliştiriciler tanıdık bir yalana inanır: ‘Sonra temizleriz, yeter ki önce pazara çıkalım!’ Elbette hiçbir şey sonradan temizlenmez, çünkü pazar baskıları hiç dinmez.”

> “Gerçek şu ki, dağınıklık yaratmak her zaman temiz kalmaktan daha yavaştır; hangi zaman ölçeğini kullanırsanız kullanın.”

Clean Architecture Sınırları Her mimari sınırda, Humble Object deseninin bir yerlerde pusuda beklediğine rastlamanız çok muhtemeldir. İşte pratikte nasıl göründüğü:

```typescript
// ❌ Quick and Dirty Implementation
const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Messy side effects
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(err => setError(err.message));
  }, [id]);

  // Business logic mixed with UI logic
  const addToCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        body: JSON.stringify({ productId: product?.id }),
      });
      const updatedCart = await response.json();
      setCart(updatedCart);
      // Direct DOM manipulation
      window.alert('Added to cart!');
    } catch (err) {
      setError((err as Error).message);
    }
  };
};

// ✅ Clean, Modular Implementation
// Domain Entity
interface Product {
  id: string;
  name: string;
  price: Money;
  inventory: Inventory;
}

// Use Case / Application Service
class ProductService {
  constructor(private readonly productRepo: ProductRepository) {}

  async getProduct(id: string): Promise<Product> {
    return this.productRepo.findById(id);
  }

  async getRelatedProducts(product: Product): Promise<Product[]> {
    return this.productRepo.findRelated(product);
  }
}

// Repository Interface
interface ProductRepository {
  findById(id: string): Promise<Product>;
  findRelated(product: Product): Promise<Product[]>;
}

// Custom Hook (Framework-specific adapter)
const useProduct = (id: string) => {
  return useQuery(['product', id], () => productService.getProduct(id));
};

// Clean Component
const ProductPage: React.FC = () => {
  const { data: product, isLoading, error } = useProduct(id);
  const { data: relatedProducts } = useRelatedProducts(product);
  const { addToCart, isAdding } = useCartMutation();

  if (isLoading) return <ProductSkeleton />;
  if (error) return <ErrorBoundary error={error} />;

  return (
    <ProductLayout>
      <ProductDetails product={product} />
      <AddToCartButton 
        onAdd={() => addToCart(product.id)} 
        isLoading={isAdding} 
      />
      <RelatedProducts products={relatedProducts} />
    </ProductLayout>
  );
};
```

## Mimari ve Framework Bağımsızlığı

> “Web bir teslimat mekanizmasıdır... ve mimariniz de ona böyle davranmalıdır.”

> “Eğer framework, iş nesnelerinizi kendi temel sınıflarından türetmenizi istiyorsa, hayır deyin! Onun yerine proxy’ler türetin ve bu proxy’leri iş kurallarınıza eklenti olan bileşenlerde tutun.”

```typescript
// Domain Entities (Framework Independent)
interface Order {
  id: string;
  items: OrderItem[];
  total: Money;
  status: OrderStatus;
}

// Business Rules (Pure TypeScript)
class OrderCalculator {
  calculateTotal(items: OrderItem[]): Money {
    return items.reduce(
      (total, item) => total.add(item.price.multiply(item.quantity)),
      Money.zero()
    );
  }

  applyDiscount(order: Order, discount: Discount): Order {
    return {
      ...order,
      total: order.total.subtract(this.calculateDiscount(order, discount))
    };
  }
}

// Framework Adapter (React-specific)
const useOrder = (orderId: string) => {
  const calculator = new OrderCalculator();
  const { data: order } = useQuery(['order', orderId], fetchOrder);
  
  return {
    order,
    applyDiscount: (discount: Discount) => 
      calculator.applyDiscount(order!, discount),
    // other order operations...
  };
};

// UI Component (Framework-specific)
const OrderSummary: React.FC<{ orderId: string }> = ({ orderId }) => {
  const { order, applyDiscount } = useOrder(orderId);
  // React-specific rendering logic
};
```

## Clean Architecture Sınırları

> “Her mimari sınırda, Humble Object deseninin yakınlarda bir yerde pusuda beklediğine rastlarız.”

```typescript
// Domain Layer (Business Rules)
interface PaymentProcessor {
  process(payment: Payment): Promise<PaymentResult>;
}

// Application Layer (Use Cases)
class PaymentService {
  constructor(private processor: PaymentProcessor) {}

  async processPayment(order: Order): Promise<PaymentResult> {
    // Business logic for payment processing
    return this.processor.process({
      amount: order.total,
      currency: order.currency,
      orderId: order.id
    });
  }
}

// Infrastructure Layer (External Services)
class StripePaymentProcessor implements PaymentProcessor {
  constructor(private stripe: Stripe) {}

  async process(payment: Payment): Promise<PaymentResult> {
    const result = await this.stripe.charges.create({
      amount: payment.amount.value,
      currency: payment.currency,
      metadata: { orderId: payment.orderId }
    });
    return this.mapToPaymentResult(result);
  }
}

// Presentation Layer (React Components)
const CheckoutButton: React.FC<{ order: Order }> = ({ order }) => {
  const paymentService = usePaymentService();
  const mutation = useMutation(
    () => paymentService.processPayment(order),
    {
      onSuccess: (result) => {
        // Handle success
      },
      onError: (error) => {
        // Handle error
      }
    }
  );

  return (
    <Button 
      onClick={() => mutation.mutate()} 
      loading={mutation.isLoading}
    >
      Pay Now
    </Button>
  );
};
```

## Test ve Bağımlılık Yönetimi

> “İhtiyacınız olmayan şeylere bağımlı olmayın.”

Test ve Bağımlılık Yönetimi Gelin bağımlılıklardan konuşalım; özellikle de ihtiyacınız olmayan şeylere neden bağımlı olmamanız gerektiğinden.

```typescript
// ❌ Hard to Test Component with Direct Dependencies
const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User>();
  
  useEffect(() => {
    axios.get('/api/user').then(res => setUser(res.data));
  }, []);
  
  return <div>{user?.name}</div>;
};

// ✅ Testable Component with Injected Dependencies
interface UserProfileProps {
  userService: UserService;
}

const UserProfile: React.FC<UserProfileProps> = ({ userService }) => {
  const { data: user } = useQuery(
    'user',
    () => userService.getCurrentUser()
  );
  
  return <div>{user?.name}</div>;
};

// Easy to test with mock service
describe('UserProfile', () => {
  it('displays user name', async () => {
    const mockService = {
      getCurrentUser: jest.fn().mockResolvedValue({ name: 'John' })
    };
    
    render(<UserProfile userService={mockService} />);
    
    expect(await screen.findByText('John')).toBeInTheDocument();
  });
});
```

## Sonuç

> “İyi mimarlar, ayrıntıları politikadan dikkatle ayırır ve ardından politikayı ayrıntılardan o kadar iyice koparır ki politikanın ayrıntılardan hiçbir bilgisi kalmaz.”

Sonuç İyi mimarlar ayrıntıları politikadan ayırmayı ve ardından politikayı ayrıntılardan öyle iyi koparmayı bilir ki politikanın ayrıntılardan haberi bile olmaz. Bu rehber size şunları gösteriyor:

- Kodunuzu framework’ten bağımsız tutun
- Test yazmayı çocuk oyuncağı hâline getirin
- Bağımlılıkları bir profesyonel gibi yönetin
- Sorumlulukları düzgün şekilde ayırın
- Gerçekten ölçeklenebilen uygulamalar geliştirin

Unutmayın, bunlar katı kurallar değil, araçlar. Projeniz için mantıklı geldiklerinde kullanın. Bu konulardan herhangi birinde daha derine inmek ister misiniz? Bana yazmanız yeterli!

`Bu yazı, Clean Architecture kitabından aldığım notlar kullanılarak yapay zekâ yardımıyla oluşturuldu.`
