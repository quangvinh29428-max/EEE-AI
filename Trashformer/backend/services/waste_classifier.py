"""
Waste Knowledge Base & Classification Engine for Trashformer
Cơ sở dữ liệu khoa học toàn diện về rác thải sinh hoạt (30+ danh mục rác chi tiết)
"""

from schemas.waste_schema import WasteCategory

WASTE_KNOWLEDGE_BASE = {
    # =========================================================================
    # NHÓM A - RÁC HỮU CƠ (ORGANIC WASTE - 10 LOẠI)
    # =========================================================================
    "thuc_an_thua": {
        "slug": "thuc-an-thua",
        "name": "Thức ăn thừa & Cơm nguội",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["thực phẩm thừa", "cơm nguội", "thịt cá thừa", "canh thừa", "đồ ăn ôi thiu"],
        "description": "Các chất hữu cơ dư thừa từ bữa ăn hàng ngày, dễ phân hủy sinh học và giàu dưỡng chất.",
        "material": "Hợp chất hữu cơ tự nhiên (protein, tinh bột, lipit)",
        "recyclable": True,
        "physical_properties": [
            "Độ ẩm rất cao (60 - 80% nước)",
            "Mềm, dễ bị vi sinh vật phân giải",
            "Bốc mùi chua hoặc ôi thiu sau vài giờ ngoài không khí"
        ],
        "advantages": [
            "Dễ phân hủy sinh học hoàn toàn trong tự nhiên",
            "Ủ thành phân compost hữu cơ giàu dinh dưỡng cho cây trồng",
            "Sản xuất khí sinh học (Biogas) phục vụ đun nấu và phát điện"
        ],
        "disadvantages": [
            "Bốc mùi hôi thối và sinh khí Metan (CH4) gây hiệu ứng nhà kính mạnh",
            "Tạo nước rỉ rác thu hút ruồi muỗi, chuột bọ mang mầm bệnh",
            "Làm bẩn và giảm khả năng tái chế của các loại rác vô cơ khác nếu vứt lẫn"
        ],
        "reuse_potential": "Ủ phân hữu cơ vi sinh bón vườn; làm thức ăn chăn nuôi gia súc/giun quế (nếu chưa ôi thiu).",
        "recyclability": "Tái chế sinh học 100% (Biological Recycling qua ủ compost hoặc hầm biogas).",
        "environmental_impact": [
            "Phát thải lượng lớn khí nhà kính Metan nếu chôn lấp kín ở bãi rác",
            "Nước rỉ rác có thể ngấm sâu vào đất làm phú dưỡng hóa nguồn nước ngầm"
        ],
        "handling_guide": [
            "Bước 1: Chắt bỏ toàn bộ nước canh và dầu mỡ thừa vào chai riêng (không đổ vào cống)",
            "Bước 2: Gom thức ăn đặc vào túi hoặc xô chứa rác hữu cơ có nắp đậy kín",
            "Bước 3: Tận dụng ủ phân compost tại nhà nếu có sân vườn",
            "Bước 4: Chuyển giao hàng ngày cho xe thu gom rác hữu cơ sinh hoạt"
        ],
        "image_url": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop"
    },
    "vo_trai_cay": {
        "slug": "vo-trai-cay",
        "name": "Vỏ trái cây & Rau củ quả",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["vỏ chuối", "vỏ cam", "vỏ dưa hấu", "cuống rau", "củ hỏng", "vỏ táo"],
        "description": "Phụ phẩm thực vật tươi sạch sau quá trình sơ chế nấu nướng và gọt hoa quả.",
        "material": "Cellulose, chất xơ tự nhiên, pectin, nước",
        "recyclable": True,
        "physical_properties": [
            "Giàu xơ, nước và khoáng chất tự nhiên",
            "Vỏ quả có múi chứa nhiều tinh dầu thơm (cam, quýt, bưởi)",
            "Tốc độ phân hủy nhanh từ 1 đến 3 tuần"
        ],
        "advantages": [
            "Phân hủy nhanh tạo mùn đất tơi xốp, giàu kali",
            "Vỏ cam bưởi ngâm ủ thành dung dịch tẩy rửa enzyme sinh học (Eco-Enzyme)",
            "Hoàn toàn lành tính, an toàn tuyệt đối cho người thu gom"
        ],
        "disadvantages": [
            "Dễ sinh ruồi giấm nếu để hở trong bếp",
            "Một số loại vỏ dày (sầu riêng, dừa, hạt xoài) phân hủy chậm hơn"
        ],
        "reuse_potential": "Làm nước tẩy rửa sinh học Eco-Enzyme đa năng, tinh dầu xua đuổi côn trùng.",
        "recyclability": "Tái chế sinh học 100% thành phân bón mùn vi sinh.",
        "environmental_impact": [
            "Thân thiện hoàn toàn với môi trường nếu được trả về đất",
            "Giảm tải đáng kể khối lượng rác chôn lấp tại các đô thị"
        ],
        "handling_guide": [
            "Bước 1: Bóc gọt sạch, lột bỏ nhãn dán sticker nhựa dán trên quả",
            "Bước 2: Cắt nhỏ để tăng diện tích tiếp xúc giúp phân hủy nhanh hơn",
            "Bước 3: Cho vào thùng ủ phân compost hoặc ủ nước enzyme (ngâm tỷ lệ 1 đường: 3 vỏ: 10 nước)",
            "Bước 4: Bỏ vào thùng rác hữu cơ tự phân hủy"
        ],
        "image_url": "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&auto=format&fit=crop"
    },
    "la_cay_canh_cay": {
        "slug": "la-cay-canh-cay",
        "name": "Lá cây & Cành cây nhỏ & Cỏ vụn",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["lá rụng", "cỏ vụn sân vườn", "cành cây khô", "hoa tàn", "xác cây cảnh"],
        "description": "Chất thải xanh từ sân vườn, công viên, ban công cây cảnh đô thị.",
        "material": "Lignin, cellulose khô, sinh khối thực vật",
        "recyclable": True,
        "physical_properties": [
            "Lá khô nhẹ, giòn, màu nâu hoặc vàng",
            "Hàm lượng Carbon (rác nâu) cao, độ ẩm thấp",
            "Dễ bén lửa khi khô ráo"
        ],
        "advantages": [
            "Là nguồn Carbon tuyệt hảo để phối trộn cân bằng độ ẩm khi ủ phân compost",
            "Dùng làm lớp phủ (mulching) giữ ẩm và chống xói mòn gốc cây",
            "Có thể ép viên nén sinh khối làm năng lượng đốt sạch"
        ],
        "disadvantages": [
            "Cành cây to cần máy băm nghiền mới phân hủy nhanh",
            "Tuyệt đối không đốt vì sinh ra khói độc bụi mịn PM2.5 ô nhiễm không khí"
        ],
        "reuse_potential": "Rải quanh gốc cây giữ ẩm đất; ủ mục làm giá thể trồng lan, rau sạch.",
        "recyclability": "100% tái tạo sinh khối và dinh dưỡng cho đất mẹ.",
        "environmental_impact": [
            "Nếu bị đốt lộ thiên sẽ phát thải lượng lớn khói bụi mịn PM2.5 và khí CO độc hại",
            "Nếu ủ mùn sẽ cố định Carbon trong đất, cải tạo cấu trúc vi sinh"
        ],
        "handling_guide": [
            "Bước 1: Tuyệt đối không quét gom lại rồi châm lửa đốt",
            "Bước 2: Dùng kéo cắt tỉa nhỏ cành cây và gom lá rụng vào bao tải",
            "Bước 3: Phủ vào các gốc cây cảnh hoặc trộn vào thùng ủ compost",
            "Bước 4: Chuyển giao cho đội thu gom rác vườn đô thị"
        ],
        "image_url": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop"
    },
    "ba_ca_phe_tra": {
        "slug": "ba-ca-phe-tra",
        "name": "Bã cà phê & Bã trà túi lọc",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["bã cafe", "xác trà", "túi lọc trà", "bã trà xanh"],
        "description": "Phần bã thực vật sau khi pha chế đồ uống nóng hàng ngày, giàu khoáng chất nitơ.",
        "material": "Hạt cà phê xay, lá trà nghiền, cellulose",
        "recyclable": True,
        "physical_properties": [
            "Dạng bột hạt mịn hoặc lá vụn ẩm màu nâu sẫm",
            "Có mùi thơm đặc trưng của cà phê hoặc thảo mộc",
            "Có tính axit nhẹ"
        ],
        "advantages": [
            "Khử mùi hôi tủ lạnh, giày dép và bồn rửa bát cực kỳ hiệu quả",
            "Phân bón tuyệt hảo cho các loại cây ưa axit (hoa hồng, cẩm tú cầu)",
            "Chống ốc sên và côn trùng gây hại cắn phá vườn rau"
        ],
        "disadvantages": [
            "Dễ bị mốc đen nếu để ẩm ướt trong hộp kín nhiều ngày",
            "Túi lọc trà có thể chứa sợi nilon nhân tạo cần xé bỏ trước khi bón đất"
        ],
        "reuse_potential": "Làm túi hút ẩm khử mùi, tẩy tế bào chết da tự nhiên, bón gốc hoa cảnh.",
        "recyclability": "Tái chế hữu cơ 100% thành phân bón mùn giàu đạm.",
        "environmental_impact": [
            "Hoàn toàn lành tính và cải thiện độ tơi xốp cho đất trồng"
        ],
        "handling_guide": [
            "Bước 1: Để bã ráo nước, phơi khô nếu muốn trữ làm chất khử mùi",
            "Bước 2: Nếu là trà túi lọc: Cắt bỏ dây chỉ, ghim sắt và bao túi nylon bên ngoài",
            "Bước 3: Rải trực tiếp quanh gốc cây cảnh hoặc trộn vào đất trồng rau",
            "Bước 4: Bỏ vào thùng rác hữu cơ sinh hoạt"
        ],
        "image_url": "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop"
    },
    "vo_trung": {
        "slug": "vo-trung",
        "name": "Vỏ trứng gà & Trứng vịt",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["vỏ trứng gia cầm", "vỏ trứng chim cút", "vỏ trứng vỡ"],
        "description": "Lớp vỏ cứng bảo vệ ngoài của trứng gia cầm, thành phần chủ yếu là canxi cacbonat.",
        "material": "Canxi cacbonat (CaCO3 - chiếm 95%), màng protein hữu cơ",
        "recyclable": True,
        "physical_properties": [
            "Mỏng, giòn, dễ bóp vỡ vụn",
            "Màu trắng hoặc nâu nhạt",
            "Phía trong có lớp màng lụa mỏng dính"
        ],
        "advantages": [
            "Bổ sung Canxi hữu cơ dồi dào cho đất chống thối rễ cây trồng",
            "Mảnh vỏ vụn sắc nhọn ngăn chặn ốc sên bò lên luống rau non",
            "Làm thức ăn bổ sung canxi nghiền mịn cho gà, vịt ăn"
        ],
        "disadvantages": [
            "Nếu không rửa sơ có thể bốc mùi tanh của lòng trắng trứng thừa",
            "Phân hủy chậm hơn thức ăn thừa nếu để nguyên mảng lớn"
        ],
        "reuse_potential": "Nghiền vụn bón gốc cà chua, ớt cảnh; làm chậu ươm hạt giống mini.",
        "recyclability": "100% tái tạo khoáng chất Canxi cho đất.",
        "environmental_impact": [
            "Cải tạo đất chua, cân bằng độ pH đất nông nghiệp"
        ],
        "handling_guide": [
            "Bước 1: Tráng sơ nước sạch để trôi hết phần lòng trắng tanh bám dính",
            "Bước 2: Phơi khô rồi bóp nát hoặc dùng máy xay vụn thành bột",
            "Bước 3: Rắc quanh gốc cây ăn trái, cà chua, hoa hồng",
            "Bước 4: Bỏ vào thùng rác hữu cơ"
        ],
        "image_url": "https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=600&auto=format&fit=crop"
    },
    "xuong_dong_vat_nho": {
        "slug": "xuong-dong-vat-nho",
        "name": "Xương động vật nhỏ & Vỏ nghêu sò",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["xương cá", "xương gà", "vỏ nghêu", "vỏ sò", "vỏ ốc", "vỏ tôm cua"],
        "description": "Phần xương sụn động vật nhỏ và vỏ giáp xác sau khi ăn uống.",
        "material": "Canxi photphat, collagen, kitin (tôm cua), khoáng chất",
        "recyclable": True,
        "physical_properties": [
            "Rắn chắc, giòn đối với xương cá; cứng đối với vỏ sò ốc",
            "Thời gian phân hủy tự nhiên từ vài tháng đến vài năm nếu không nghiền"
        ],
        "advantages": [
            "Giàu Canxi và Photpho (Lân) – dinh dưỡng cực tốt kích thích ra hoa đậu quả",
            "Vỏ tôm cua chứa kitin giúp kháng nấm bệnh trong đất"
        ],
        "disadvantages": [
            "Xương nhọn có thể làm rách túi bóng đựng rác",
            "Nếu chôn thô chưa nghiền có thể thu hút chó mèo hoang bới bới"
        ],
        "reuse_potential": "Nghiền làm bột xương bón cây cảnh hoặc bổ sung thức ăn chăn nuôi gia súc.",
        "recyclability": "Tái chế sinh học thành bột phân lân hữu cơ.",
        "environmental_impact": ["Lành tính nếu được nghiền vụn trả về đất"],
        "handling_guide": [
            "Bước 1: Gom riêng, rửa sơ cho bớt dầu mỡ gia vị muối mặn",
            "Bước 2: Đập giập đối với xương gà/vịt",
            "Bước 3: Bỏ vào túi rác hữu cơ dày dặn tránh đâm thủng",
            "Bước 4: Gửi cho đơn vị xử lý rác hữu cơ"
        ],
        "image_url": "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop"
    },
    "giay_an_dinh_thuc_an": {
        "slug": "giay-an-dinh-thuc-an",
        "name": "Giấy ăn & Khăn giấy dính dầu mỡ thực phẩm",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["giấy ăn lau miệng", "khăn giấy nhà bếp", "giấy thấm dầu", "hộp bánh pizza dính mỡ"],
        "description": "Khăn giấy lau dầu mỡ thức ăn – KHÔNG thể tái chế thành giấy trắng mà phải xếp vào nhóm hữu cơ.",
        "material": "Sợi bột gỗ tự nhiên ngấm dầu mỡ thực phẩm",
        "recyclable": True, # Tái chế qua ủ phân compost
        "physical_properties": [
            "Mềm, thấm đẫm dầu mỡ và vụn đồ ăn",
            "Dễ rách, phân hủy rất nhanh trong đất ẩm"
        ],
        "advantages": [
            "Phân hủy hoàn toàn trong thùng ủ phân compost trong 2 - 4 tuần",
            "Cân bằng tỷ lệ ẩm khi ủ cùng rác xanh rau củ"
        ],
        "disadvantages": [
            "TUYỆT ĐỐI KHÔNG BỎ VÀO THÙNG GIẤY TÁI CHẾ VÔ CƠ vì dầu mỡ sẽ làm hỏng toàn bộ mẻ bột giấy của nhà máy",
            "Dễ bốc mùi hôi mỡ nếu để lâu ngày"
        ],
        "reuse_potential": "Ủ phân compost hữu cơ tại nhà.",
        "recyclability": "Tái chế sinh học thành phân mùn (không tái chế thành giấy viết được).",
        "environmental_impact": ["Phân hủy sinh học tự nhiên, không để lại tồn dư"],
        "handling_guide": [
            "Bước 1: Không để chung với sách báo giấy tái chế sạch",
            "Bước 2: Cho trực tiếp vào túi đựng rác hữu cơ nhà bếp",
            "Bước 3: Tận dụng bỏ vào đáy chậu ủ phân compost làm lớp đệm thấm hút",
            "Bước 4: Chuyển giao cùng rác thực phẩm"
        ],
        "image_url": "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&auto=format&fit=crop"
    },
    "hoa_tuoi_cung": {
        "slug": "hoa-tuoi-cung",
        "name": "Hoa tươi tàn & Hoa cúng",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["hoa cúc tàn", "hoa hồng héo", "hoa dâng cúng", "cành hoa cắm bình"],
        "description": "Các loại hoa tươi sau khi trưng bày bàn thờ hoặc cắm lọ trong gia đình bị héo úa.",
        "material": "Cánh hoa, cuống hoa, diệp lục, nước thực vật",
        "recyclable": True,
        "physical_properties": [
            "Cánh hoa mềm, mỏng, rụng rải rác",
            "Cuống hoa dai, một số có gai (hoa hồng)",
            "Chuyển màu nâu thẫm khi khô héo"
        ],
        "advantages": [
            "Phân hủy nhanh trong 1 - 2 tuần",
            "Cánh hoa có thể ủ làm nước enzyme tưới hoa hồng rất tốt",
            "Lành tính, không độc hại"
        ],
        "disadvantages": [
            "Nước cắm hoa để lâu trong bình bốc mùi hôi thối cần đổ trước",
            "Gai hoa hồng có thể chọc rách túi rác"
        ],
        "reuse_potential": "Ủ phân mùn bón chậu cây cảnh sân thượng.",
        "recyclability": "Tái chế sinh học 100%.",
        "environmental_impact": ["Thân thiện hoàn toàn với thiên nhiên"],
        "handling_guide": [
            "Bước 1: Đổ bỏ nước cắm hoa vào cống thoát nước",
            "Bước 2: Tháo bỏ mút xốp cắm hoa (mút xốp là rác vô cơ không tái chế)",
            "Bước 3: Cắt ngắn cành hoa và gom cánh hoa vào bao rác hữu cơ",
            "Bước 4: Bỏ vào thùng rác hữu cơ sinh hoạt"
        ],
        "image_url": "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop"
    },
    "phan_thu_cung": {
        "slug": "phan-thu-cung",
        "name": "Chất thải thú cưng & Cát vệ sinh hữu cơ",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["phân chó mèo", "cát vệ sinh đậu nành", "mùn cưa lót chuồng hamster"],
        "description": "Chất thải bài tiết từ vật nuôi gia đình kèm chất độn chuồng hữu cơ.",
        "material": "Chất hữu cơ động vật, xơ bã đậu nành, gỗ mùn cưa",
        "recyclable": True,
        "physical_properties": [
            "Có mùi hôi nồng đặc trưng",
            "Dễ phân rã trong nước đối với cát đậu phụ/gỗ ép"
        ],
        "advantages": [
            "Cát đậu phụ hữu cơ có thể tự tan rã sinh học hoàn toàn",
            "Có thể ủ riêng biệt thành phân bón cho cây cảnh không ăn quả"
        ],
        "disadvantages": [
            "Chứa vi khuẩn E.coli và ký sinh trùng Toxoplasma gondii nguy hiểm",
            "TUYỆT ĐỐI KHÔNG BÓN cho rau ăn lá hoặc cây ăn trái ăn sống"
        ],
        "reuse_potential": "Ủ compost riêng biệt cho bãi cỏ công viên hoặc cây bóng mát.",
        "recyclability": "Tái chế sinh học sau quy trình ủ nhiệt độ cao tiêu diệt mầm bệnh.",
        "environmental_impact": ["Nguy cơ lây nhiễm ký sinh trùng nếu vứt lộ thiên"],
        "handling_guide": [
            "Bước 1: Dùng xẻng xúc phân bỏ vào túi giấy hoặc túi tự phân hủy",
            "Bước 2: Buộc kín miệng túi để tránh mùi hôi và ruồi nhặng",
            "Bước 3: Không đổ cát đất sét khó tiêu vào bồn cầu gây tắc cống",
            "Bước 4: Bỏ vào thùng rác hữu cơ"
        ],
        "image_url": "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&auto=format&fit=crop"
    },
    "mut_dua_rom_kho": {
        "slug": "mut-dua-rom-kho",
        "name": "Xơ dừa & Mụn dừa & Rơm rạ",
        "category": WasteCategory.ORGANIC,
        "category_label": "Nhóm A - Rác Hữu Cơ",
        "common_names": ["vỏ dừa khô", "xơ dừa trồng lan", "mụn dừa", "rơm khô"],
        "description": "Phụ phẩm nông nghiệp từ quả dừa và thân cây lúa sau thu hoạch.",
        "material": "Sợi xơ cellulose thô, lignin bền vững",
        "recyclable": True,
        "physical_properties": [
            "Sợi dai, màu nâu vàng, xốp nhẹ",
            "Khả năng giữ ẩm và thoát nước cực tốt",
            "Thời gian phân hủy từ 6 tháng đến 1 năm"
        ],
        "advantages": [
            "Giá thể trồng lan, hoa kiểng, dâu tây và rau mầm số 1 hiện nay",
            "Giữ nước cho đất trong mùa khô hạn gấp 10 lần trọng lượng",
            "Bền chắc, chống xói mòn đất đồi dốc"
        ],
        "disadvantages": [
            "Vỏ dừa nguyên khối rất cứng, cần máy băm xơ dừa chuyên dụng",
            "Xơ dừa mới có chứa chất chát Tanin và Lignin cần xả nước xử lý trước khi trồng cây"
        ],
        "reuse_potential": "Làm thảm xơ dừa chống xói mòn, giá thể trồng cây công nghệ cao.",
        "recyclability": "100% tái tạo đất mùn hữu cơ.",
        "environmental_impact": ["Thân thiện tuyệt đối với môi trường"],
        "handling_guide": [
            "Bước 1: Chặt nhỏ vỏ dừa để ráo nước",
            "Bước 2: Tận dụng lót đáy chậu trồng hoa kiểng giúp thoát nước tốt",
            "Bước 3: Bỏ vào túi rác vườn chuyển giao xử lý nghiền mùn"
        ],
        "image_url": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&auto=format&fit=crop"
    },

    # =========================================================================
    # NHÓM B - RÁC VÔ CƠ (INORGANIC WASTE - 12 LOẠI)
    # =========================================================================
    "chai_nhua": {
        "slug": "chai-nhua",
        "name": "Chai nhựa PET & Hộp nhựa trong",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["chai nước ngọt", "chai nước suối", "chai trà xanh", "hộp nhựa pet trong suốt"],
        "description": "Vật phẩm đóng gói đồ uống số 1 thế giới, mang ký hiệu hình tam giác số 1 (PET/PETE).",
        "material": "Polyethylene Terephthalate (PET - Mã nhựa #1)",
        "recyclable": True,
        "physical_properties": [
            "Trọng lượng nhẹ, trong suốt, độ dẻo dai cơ học cao",
            "Chống thấm khí và nước rất tốt",
            "Dễ bị biến dạng khi gặp nước sôi trên 70 độ C"
        ],
        "advantages": [
            "Nhu cầu thu mua tái chế cực cao trên toàn cầu",
            "Tái sinh thành sợi vải polyester may quần áo thể thao, thảm trải sàn hoặc chai mới",
            "Giá trị kinh tế cao trong ngành thu gom phế liệu"
        ],
        "disadvantages": [
            "Mất 450 - 1000 năm mới phân hủy tự nhiên ngoài môi trường",
            "Phân rã thành các hạt vi nhựa (Microplastics) gây ung thư",
            "Làm tắc nghẽn hệ thống cống rãnh đô thị gây ngập úng"
        ],
        "reuse_potential": "Làm chậu trồng hành hoa, bình tưới nước nhỏ giọt, đồ thủ công sáng tạo.",
        "recyclability": "RẤT CAO: Một trong những loại nhựa tái chế phổ biến và hiệu quả nhất.",
        "environmental_impact": [
            "Trôi nổi ngoài đại dương khiến rùa biển, chim biển nuốt phải tử vong",
            "Vi nhựa xâm nhập vào chuỗi thức ăn con người qua thủy hải sản"
        ],
        "handling_guide": [
            "Bước 1: Uống hết hoặc đổ sạch toàn bộ nước ngọt bên trong",
            "Bước 2: Tráng sơ nước, bóc màng co nilon nhãn mác dán ngoài chai",
            "Bước 3: Dùng chân hoặc tay dẫm bẹp thân chai để giảm 80% thể tích",
            "Bước 4: Đậy nắp chai lại và bỏ vào thùng rác tái chế / bán ve chai"
        ],
        "image_url": "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?w=600&auto=format&fit=crop"
    },
    "can_nhua_hdpe": {
        "slug": "can-nhua-hdpe",
        "name": "Can nhựa & Bình dầu gội HDPE",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["bình nước giặt", "chai dầu gội", "bình sữa tươi nắp xanh", "can dầu ăn", "nhựa số 2"],
        "description": "Bao bì nhựa cứng đục, chịu hóa chất tốt, mang ký hiệu tam giác số 2 (HDPE).",
        "material": "High-Density Polyethylene (HDPE - Mã nhựa #2)",
        "recyclable": True,
        "physical_properties": [
            "Cứng cáp, bề mặt bán mờ mờ hoặc nhiều màu sắc đục",
            "Chịu được nhiệt độ lên tới 110 độ C, kháng axit kiềm mạnh",
            "Không bị giòn gãy khi va đập"
        ],
        "advantages": [
            "Một trong những loại nhựa an toàn nhất cho sức khỏe con người",
            "Tái chế dễ dàng thành ống dẫn nước công nghiệp, thùng rác công cộng, bàn ghế nhựa",
            "Độ bền cực cao, tái sử dụng đựng nước sinh hoạt nhiều lần an toàn"
        ],
        "disadvantages": [
            "Mất 500 năm mới phân hủy tự nhiên trong lòng đất",
            "Bình đựng hóa chất tẩy rửa cần rửa sạch trước khi tái chế"
        ],
        "reuse_potential": "Tái sử dụng đựng nước tưới cây, dung dịch tẩy rửa gia đình, cắt làm xẻng xúc đất.",
        "recyclability": "RẤT CAO: Được các nhà máy tái chế hạt nhựa ưu tiên thu mua.",
        "environmental_impact": [
            "Tồn tại bền vững hàng trăm năm ở bãi rác chôn lấp nếu không được thu gom"
        ],
        "handling_guide": [
            "Bước 1: Tráng sạch bọt xà phòng hoặc dầu giặt bên trong bình",
            "Bước 2: Tháo vòi xịt bơm (vòi pump có lò xo kim loại) bỏ riêng",
            "Bước 3: Để ráo nước và ép bẹp nếu được",
            "Bước 4: Bỏ vào thùng rác tái chế hoặc bán cho người thu mua phế liệu"
        ],
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop"
    },
    "lon_nhom": {
        "slug": "lon-nhom",
        "name": "Lon nhôm (Bia & Nước ngọt)",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["lon bia", "lon coca", "lon nước ngọt", "lon nước yến", "vỏ lon nhôm"],
        "description": "Bao bì đồ uống kim loại nhẹ phổ biến nhất, làm từ hợp kim nhôm cao cấp.",
        "material": "Hợp kim nhôm (Alloy Aluminum)",
        "recyclable": True,
        "physical_properties": [
            "Trọng lượng siêu nhẹ, chống ánh sáng và oxy hoàn hảo",
            "Dễ bị bóp méo dẹp bằng tay hoặc chân",
            "Không bị nam châm hút (không có từ tính)"
        ],
        "advantages": [
            "VẬT LIỆU TÁI CHẾ VÔ TẬN: Có thể nấu chảy tái chế vô hạn lần mà không giảm chất lượng",
            "Tiết kiệm tới 95% năng lượng so với luyện quặng nhôm bauxite nguyên sinh",
            "Giá trị kinh tế thu gom ve chai phế liệu cao nhất trong các loại rác gia đình"
        ],
        "disadvantages": [
            "Nếu vứt bừa bãi mất từ 200 - 500 năm mới oxy hóa hoàn toàn",
            "Cạnh lon sắc bén khi bị cắt rách có thể làm đứt tay"
        ],
        "reuse_potential": "Làm hộp đựng bút viết, đồ chơi tái chế, gạt tàn mini.",
        "recyclability": "TUYỆT VỜI (Gần như 100% lon nhôm trên thị trường đều được thu gom tái chế tuần hoàn).",
        "environmental_impact": [
            "Khai thác quặng bauxite tàn phá nghiêm trọng các cánh rừng nhiệt đới",
            "Tái chế lon giúp cắt giảm hàng triệu tấn CO2 mỗi năm"
        ],
        "handling_guide": [
            "Bước 1: Rút sạch đồ uống thừa bên trong lon",
            "Bước 2: Dẫm bẹp thân lon để giảm 75% thể tích lưu trữ",
            "Bước 3: Gom vào bao tải khô ráo",
            "Bước 4: Bán lại cho cơ sở ve chai hoặc đưa vào thùng rác tái chế kim loại"
        ],
        "image_url": "https://images.unsplash.com/photo-1582408921715-18e7806365c1?w=600&auto=format&fit=crop"
    },
    "hop_thiec_sat": {
        "slug": "hop-thiec-sat",
        "name": "Hộp thiếc & Đồ hộp kim loại",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["hộp sữa đặc ông thọ", "hộp cá mòi", "hộp thịt heo", "nắp chai bia kim loại"],
        "description": "Vỏ hộp đóng gói thực phẩm bảo quản lâu năm làm từ thép tráng thiếc mỏng.",
        "material": "Thép tráng thiếc (Tinplate), kim loại sắt (Fe)",
        "recyclable": True,
        "physical_properties": [
            "Cứng cáp, chịu lực va đập rất lớn",
            "Nặng hơn lon nhôm, bị nam châm hút chặt",
            "Dễ bị gỉ sét màu nâu đỏ khi gặp nước và không khí ẩm"
        ],
        "advantages": [
            "Tái chế thành thép xây dựng, linh kiện máy móc",
            "Dễ dàng tách lọc tại nhà máy rác bằng hệ thống nam châm từ tính",
            "Giá trị thu hồi phế liệu cao"
        ],
        "disadvantages": [
            "Cạnh nắp hộp sau khi khui rất sắc nhọn nguy hiểm cho người thu gom",
            "Dính dầu mỡ thực phẩm nếu không rửa sẽ bốc mùi hôi tanh"
        ],
        "reuse_potential": "Làm chậu trồng cây sen đá, hộp đựng ốc vít, chân nến thơm.",
        "recyclability": "Rất cao tại các lò luyện kim.",
        "environmental_impact": [
            "Luyện quặng sắt tiêu tốn than đá và phát thải nhiều khí nhà kính",
            "Mảnh sắt gỉ sét gây thương tích uốn ván cho động vật"
        ],
        "handling_guide": [
            "Bước 1: Tráng rửa sạch dầu mỡ hoặc cặn sữa đặc bên trong",
            "Bước 2: Ấn nắp khui sắc nhọn thụt vào trong lòng hộp để an toàn cho người nhặt rác",
            "Bước 3: Gom gọn bỏ vào thùng rác kim loại tái chế"
        ],
        "image_url": "https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=600&auto=format&fit=crop"
    },
    "thung_carton": {
        "slug": "thung-carton",
        "name": "Thùng Carton & Hộp giấy chuyển hàng",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["hộp carton shopee", "thùng mỳ tôm", "bìa các tông", "hộp bánh kẹo"],
        "description": "Vật liệu bao gói hàng hóa phổ biến nhất trong thương mại điện tử hiện đại.",
        "material": "Bột gỗ sợi xenlulozo tự nhiên ép lớp sóng trợ lực",
        "recyclable": True,
        "physical_properties": [
            "Nhẹ, có cấu trúc lớp sóng trợ lực chịu nén tốt",
            "Dễ thấm nước, dễ bị mủn rách khi ướt mưa",
            "Màu nâu kraft đặc trưng"
        ],
        "advantages": [
            "Có thể tái chế từ 5 đến 7 chu kỳ thành bìa carton mới",
            "Thời gian phân hủy nhanh (2 - 6 tuần) nếu ở điều kiện tự nhiên",
            "Nguồn bao bì thân thiện thay thế hoàn hảo cho túi xốp nhựa"
        ],
        "disadvantages": [
            "Nếu bị dính nước mưa trong quá trình vận chuyển sẽ giảm giá trị tái chế",
            "Thùng dính băng dính keo nhựa cần tháo gỡ thủ công"
        ],
        "reuse_potential": "Làm thùng đựng đồ dọn nhà, làm nhà giấy đồ chơi cho mèo/trẻ em.",
        "recyclability": "Khả năng tái chế RẤT CAO nếu giữ khô ráo sạch sẽ.",
        "environmental_impact": [
            "Mỗi tấn bìa carton tái chế giúp bảo tồn 17 cây xanh và tiết kiệm 26.000 lít nước sạch",
            "Giảm thể tích chôn lấp tại các bãi rác đô thị"
        ],
        "handling_guide": [
            "Bước 1: Rạch bóc toàn bộ băng dính dán ngoài và tem nhãn vận chuyển",
            "Bước 2: Gập phẳng thùng carton thành các tấm dẹp",
            "Bước 3: Buộc thành từng cọc vuông vắn và giữ khô ráo tuyệt đối",
            "Bước 4: Bán phế liệu hoặc bỏ vào thùng rác tái chế giấy"
        ],
        "image_url": "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=600&auto=format&fit=crop"
    },
    "sach_bao_giay_a4": {
        "slug": "sach-bao-giay-a4",
        "name": "Sách báo cũ & Giấy văn phòng A4",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["tài liệu in ấn", "giấy photo", "vở học sinh cũ", "báo giấy", "tạp chí cũ"],
        "description": "Giấy viết và giấy in ấn văn phòng phẩm chất lượng cao làm từ sợi bột gỗ tinh khiết.",
        "material": "Sợi xenlulozo tinh chế trắng",
        "recyclable": True,
        "physical_properties": [
            "Tấm mỏng phẳng, màu trắng hoặc in chữ màu",
            "Dễ rách, dễ cháy, thấm nước rất nhanh"
        ],
        "advantages": [
            "Là nguồn nguyên liệu giấy tái chế cao cấp nhất",
            "Dễ tẩy mực để tái sản xuất giấy photocopy hoặc khăn ăn chất lượng cao",
            "Giá thu mua phế liệu giấy cao"
        ],
        "disadvantages": [
            "Chứa tài liệu thông tin cá nhân cần hủy trước khi vứt",
            "Dễ bị ố vàng hoặc ẩm mốc khi lưu trữ lâu"
        ],
        "reuse_potential": "Tận dụng mặt sau làm giấy nháp ghi chú; gói bọc đồ thủy tinh khi chuyển nhà.",
        "recyclability": "Rất cao: Tái chế tuần hoàn qua quy trình nghiền bột giấy.",
        "environmental_impact": [
            "Cắt giảm nhu cầu chặt phá rừng tự nhiên để lấy gỗ làm bột giấy",
            "Tiết kiệm điện năng trong ngành công nghiệp giấy"
        ],
        "handling_guide": [
            "Bước 1: Tách bỏ ghim bấm kim loại, bìa nilon bóng kính",
            "Bước 2: Xé nhỏ các giấy tờ chứa thông tin nhạy cảm bảo mật",
            "Bước 3: Xếp phẳng thành chồng ngay ngắn, buộc dây gọn gàng",
            "Bước 4: Đem bán cho ve chai hoặc điểm thu gom giấy sạch"
        ],
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
    },
    "chai_lo_thuy_tinh": {
        "slug": "chai-lo-thuy-tinh",
        "name": "Chai lọ Thủy tinh & Ly cốc vỡ",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế)",
        "common_names": ["chai bia thủy tinh", "hũ mứt", "lọ nước hoa", "ly thủy tinh vỡ", "bình rượu"],
        "description": "Vật liệu silicat trơ, không thấm nước và không phản ứng hóa học với thực phẩm.",
        "material": "Silica dioxide (SiO2), tro soda, đá vôi",
        "recyclable": True,
        "physical_properties": [
            "Cứng, trong suốt hoặc có màu xanh lá/nâu hổ phách",
            "Rất dễ vỡ khi rơi, tạo các mảnh sắc nhọn cực kỳ nguy hiểm",
            "Trọng lượng nặng"
        ],
        "advantages": [
            "TÁI CHẾ 100% VÔ HẠN LẦN: Có thể nấu chảy lại vô số chu kỳ mà không suy giảm chất lượng",
            "Cực kỳ an toàn vệ sinh thực phẩm, không thôi nhiễm hóa chất độc",
            "Dễ cọ rửa và tái sử dụng đựng gia vị nhiều năm"
        ],
        "disadvantages": [
            "Mảnh vỡ cực sắc bén gây thương tích nặng cho người lao động môi trường",
            "Nặng, tốn chi phí và nhiên liệu vận chuyển",
            "Gần như không bao giờ phân hủy trong lòng đất (hơn 1 triệu năm)"
        ],
        "reuse_potential": "Rửa sạch ngâm giấm, đựng gia vị, làm bình cắm hoa decor.",
        "recyclability": "Khả năng tái chế vô hạn tại các nhà máy nấu thủy tinh.",
        "environmental_impact": [
            "Mảnh kính dưới nắng mặt trời có thể tạo hiệu ứng thấu kính hội tụ gây cháy rừng bãi rác",
            "Đâm thủng lốp xe và gây rách da động vật"
        ],
        "handling_guide": [
            "Bước 1: Rửa sạch bên trong chai lọ, tháo nắp kim loại/nhựa",
            "Bước 2: ĐỐI VỚI THỦY TINH VỠ: Bọc cẩn thận bằng nhiều lớp giấy báo dày hoặc cho vào hộp kín, ghi rõ chữ CẢNH BÁO: THỦY TINH VỠ",
            "Bước 3: Trả vỏ chai có cọc tiền cho cửa hàng đại lý (bia, nước ngọt)",
            "Bước 4: Đặt vào thùng rác tái chế vô cơ"
        ],
        "image_url": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&auto=format&fit=crop"
    },
    "hop_sua_tetrapak": {
        "slug": "hop-sua-tetrapak",
        "name": "Hộp sữa giấy Tetra Pak (Nhiều lớp)",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Có Thể Tái Chế Đặc Thù)",
        "common_names": ["vỏ hộp sữa tươi", "hộp nước ép hoa quả", "hộp sữa hạt", "vỏ hộp giấy bạc"],
        "description": "Bao bì phức hợp cao cấp gồm 6 lớp: 75% giấy, 20% màng nhựa PE và 5% màng nhôm siêu mỏng.",
        "material": "Phức hợp Giấy (Cardboard) + Nhựa Polyethylene + Nhôm",
        "recyclable": True, # Tái chế công nghệ cao
        "physical_properties": [
            "Dạng hộp khối chữ nhật cứng cáp, kín khí tuyệt đối",
            "Phía trong tráng lớp giấy bạc nhôm sáng bóng",
            "Bảo quản sữa ở nhiệt độ thường tới 6 tháng"
        ],
        "advantages": [
            "Bảo vệ sữa không bị vi khuẩn xâm nhập mà không cần chất bảo quản",
            "Tái chế tách lớp bột giấy làm vở học sinh, lớp nhôm nhựa ép làm tấm lợp mái sinh thái"
        ],
        "disadvantages": [
            "Cần nhà máy có dây chuyền thủy lực chuyên biệt mới tách được lớp nhôm và giấy",
            "Nếu còn đọng sữa thừa bên trong sẽ lên men chua bốc mùi hôi thối nồng nặc"
        ],
        "reuse_potential": "Cắt làm khay ươm cây con giống mini tại nhà.",
        "recyclability": "Tái chế tại các trạm thu gom vỏ hộp sữa chuyên trách (như chuỗi siêu thị/trường học).",
        "environmental_impact": [
            "Khó phân hủy tự nhiên do có lớp màng nhôm và nhựa bảo vệ bền vững"
        ],
        "handling_guide": [
            "Bước 1: Uống hết sữa, dùng kéo cắt dọc tai hộp hoặc mở nắp",
            "Bước 2: Tráng sơ nước sạch để trôi hết cặn sữa ôi thiu bên trong",
            "Bước 3: Đập bẹp phẳng hộp sữa để tiết kiệm diện tích lưu trữ",
            "Bước 4: Mang đến các điểm thu hồi vỏ hộp sữa tái chế của các dự án môi trường"
        ],
        "image_url": "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop"
    },
    "tui_nilon": {
        "slug": "tui-nilon",
        "name": "Túi Nilon & Túi bóng chợ (Khó tái chế)",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Khó Tái Chế)",
        "common_names": ["túi xốp đi chợ", "màng bọc thực phẩm", "bao bì gói bánh snack", "túi bóng đựng rác"],
        "description": "Các màng nhựa mỏng dẻo làm từ nhựa hạt nguyên sinh số 4 (LDPE) hoặc nhựa tái chế chất lượng thấp.",
        "material": "Low-Density Polyethylene (LDPE - Mã #4) hoặc PP",
        "recyclable": False, # Tỷ lệ tái chế thực tế rất thấp
        "physical_properties": [
            "Siêu mỏng, dẻo dai, nhẹ, co giãn tốt",
            "Không thấm nước, cách điện",
            "Dễ bay theo gió và vướng vào cành cây, cống rãnh"
        ],
        "advantages": [
            "Giá thành cực rẻ, tiện lợi khi đi chợ mua thực phẩm ướt",
            "Bảo vệ hàng hóa không bị ướt khi di chuyển dưới trời mưa"
        ],
        "disadvantages": [
            "RẤT KHÓ TÁI CHẾ trong thực tế do tỷ trọng quá nhẹ và thường bị bẩn dầu mỡ",
            "Mất 500 - 1000 năm mới phân rã thành vi nhựa độc hại",
            "Khi đốt thải ra khí cực độc Dioxin và Furan gây ung thư"
        ],
        "reuse_potential": "Giặt sạch phơi khô để dùng lại làm túi lót sọt rác hoặc đóng gói đồ đạc; nhét chặt vào chai nhựa làm Ecobrick.",
        "recyclability": "Rất thấp (Đa số các vựa ve chai từ chối thu mua túi bóng bẩn).",
        "environmental_impact": [
            "Gây 'ô nhiễm trắng' (White Pollution) khắp đất liền và đại dương",
            "Bịt miệng cống gây ngập úng đô thị mỗi mùa mưa",
            "Làm thoái hóa đất nông nghiệp, ngăn cản rễ cây hấp thụ nước"
        ],
        "handling_guide": [
            "Bước 1: Hạn chế tối đa sử dụng bằng cách mang túi vải/làn đi chợ",
            "Bước 2: Gom các túi sạch lại một chỗ để tái sử dụng nhiều lần",
            "Bước 3: Tuyệt đối không bao giờ tự ý đốt túi nilon tại sân nhà",
            "Bước 4: Bỏ vào thùng rác vô cơ không tái chế"
        ],
        "image_url": "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&auto=format&fit=crop"
    },
    "hop_xop_ps": {
        "slug": "hop-xop-ps",
        "name": "Hộp xốp đựng cơm & Ly xốp (Nhựa PS)",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Khó Tái Chế)",
        "common_names": ["hộp cơm xốp", "khay xốp đựng thịt", "ly trà tắc xốp", "mút xốp bọc hoa quả", "nhựa số 6"],
        "description": "Nhựa xốp Polystyrene giãn nở (EPS - Mã #6) chứa 95% là không khí, chuyên dùng đựng thức ăn nhanh.",
        "material": "Expanded Polystyrene (EPS / PS - Mã nhựa #6)",
        "recyclable": False,
        "physical_properties": [
            "Siêu nhẹ, màu trắng tinh xốp, cách nhiệt tốt",
            "Rất giòn, dễ bẻ gãy vụn thành các hạt xốp li ti bay theo gió"
        ],
        "advantages": [
            "Giữ ấm cơm và đồ ăn nóng rất tốt, giá thành rẻ cho quán bình dân"
        ],
        "disadvantages": [
            "GẦN NHƯ KHÔNG THỂ TÁI CHẾ tại các đô thị vì quá cồng kềnh và bẩn dầu mỡ",
            "Khi đựng thức ăn nóng trên 70 độ C hoặc nhiều dầu mỡ có thể thôi nhiễm chất Styrene gây ung thư",
            "Hạt xốp vỡ vụn phát tán khắp nơi, động vật ăn vào bị tắc nghẽn dạ dày tử vong"
        ],
        "reuse_potential": "Trộn vào đất trồng cây làm xốp đất (hạn chế); bẻ nhỏ làm vật liệu chống va đập.",
        "recyclability": "Thực tế gần như 0% được tái chế.",
        "environmental_impact": [
            "Mất hàng trăm năm không phân hủy, tạo rác thải nổi trôi trên mặt sông ngòi"
        ],
        "handling_guide": [
            "Bước 1: Hạn chế sử dụng, ưu tiên mang hộp thủy tinh/inox khi mua cơm mang về",
            "Bước 2: Vét sạch thức ăn thừa bỏ vào rác hữu cơ",
            "Bước 3: Bóp nát hộp xốp để giảm thể tích thùng rác",
            "Bước 4: Bỏ vào thùng rác vô cơ không tái chế (đưa đi thiêu đốt tập trung)"
        ],
        "image_url": "https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=600&auto=format&fit=crop"
    },
    "gom_su_sanh_vo": {
        "slug": "gom-su-sanh-vo",
        "name": "Bát đĩa gốm sứ vỡ & Đất nung",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Rác Trơ Không Tái Chế)",
        "common_names": ["bát vỡ", "chén sành", "đĩa sứ nứt", "chậu cây đất nung vỡ", "gạch men"],
        "description": "Sản phẩm đất sét nung ở nhiệt độ cao phủ men khoáng trơ hóa học.",
        "material": "Đất sét nung (Aluminosilicate), men thủy tinh nung",
        "recyclable": False,
        "physical_properties": [
            "Cứng, nặng, không thể nấu chảy ở nhiệt độ nấu thủy tinh thông thường",
            "Tạo mảnh vỡ sắc cạnh nguy hiểm khi rơi"
        ],
        "advantages": [
            "Hoàn toàn trơ về mặt hóa học, không rò rỉ bất kỳ chất độc hại nào ra đất"
        ],
        "disadvantages": [
            "KHÔNG THỂ NẤU CHẢY CÙNG THỦY TINH (Nếu lẫn vào lò nấu thủy tinh sẽ làm hỏng toàn bộ mẻ sản phẩm)",
            "Không bao giờ phân hủy trong lòng đất",
            "Mảnh sắc gây đứt tay người quét rác"
        ],
        "reuse_potential": "Đập nhỏ lót đáy chậu hoa giúp thoát nước chống úng rễ; ốp ghép tranh mosaic nghệ thuật.",
        "recyclability": "Không thể tái chế công nghiệp thông thường (chỉ có thể nghiền làm cốt liệu san lấp đường).",
        "environmental_impact": ["Lành tính nhưng chiếm thể tích chôn lấp vĩnh viễn"],
        "handling_guide": [
            "Bước 1: Không bao giờ vứt lẫn vào thùng thu gom ve chai thủy tinh",
            "Bước 2: Bọc các mảnh vỡ sắc nhọn bằng bìa carton hoặc giấy báo dày",
            "Bước 3: Dán băng dính cẩn thận và bỏ vào thùng rác vô cơ thông thường"
        ],
        "image_url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&auto=format&fit=crop"
    },
    "ong_hut_muong_nhua": {
        "slug": "ong-hut-muong_nhua",
        "name": "Ống hút nhựa & Thìa dĩa dùng 1 lần (Nhựa PP/PS)",
        "category": WasteCategory.INORGANIC,
        "category_label": "Nhóm B - Rác Vô Cơ (Khó Tái Chế)",
        "common_names": ["ống hút trà sữa", "muỗng sữa chua", "dĩa nhựa ăn bánh", "dao nhựa dùng 1 lần"],
        "description": "Vật dụng nhựa ăn uống một lần có kích thước siêu nhỏ, rất khó phân loại cơ học.",
        "material": "Polypropylene (PP #5) hoặc Polystyrene (PS #6)",
        "recyclable": False,
        "physical_properties": [
            "Nhỏ, dài hoặc dẹt, nhẹ, nhiều màu sắc bắt mắt"
        ],
        "advantages": [
            "Tiện lợi, dùng một lần không cần rửa bát trong các bữa tiệc dã ngoại"
        ],
        "disadvantages": [
            "Kích thước quá nhỏ nên lọt qua các mắt sàng của dây chuyền phân loại rác",
            "Là kẻ thù số 1 của sinh vật biển (ống hút cắm vào mũi rùa biển)",
            "Mất 500 năm để phân hủy thành vi nhựa"
        ],
        "reuse_potential": "Hạn chế tái sử dụng vì nhựa dùng 1 lần dễ thôi nhiễm hóa chất khi cọ rửa.",
        "recyclability": "Thực tế gần như 0% do chi phí thu gom phân loại đắt hơn giá trị nhựa.",
        "environmental_impact": [
            "Gây tử vong hàng triệu cá thể chim biển và sinh vật biển mỗi năm"
        ],
        "handling_guide": [
            "Bước 1: Thay đổi thói quen dùng ống hút inox, tre, bã mía hoặc ống hút gạo",
            "Bước 2: Nói 'Không lấy ống hút' khi mua đồ uống mang đi",
            "Bước 3: Bỏ vào thùng rác vô cơ không tái chế"
        ],
        "image_url": "https://images.unsplash.com/photo-1574360897459-65ac1fc6f0da?w=600&auto=format&fit=crop"
    },

    # =========================================================================
    # NHÓM C - RÁC CẦN THU GOM RIÊNG / NGUY HẠI (HAZARDOUS WASTE - 10 LOẠI)
    # =========================================================================
    "pin_cu": {
        "slug": "pin-cu",
        "name": "Pin cũ & Ắc quy (Chất thải nguy hại)",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["pin con thỏ", "pin AA/AAA", "pin cúc áo đồng hồ", "ắc quy xe máy", "pin lithium"],
        "description": "Nguồn lưu trữ điện hóa học chứa nồng độ kim loại nặng và hóa chất ăn mòn cực kỳ độc hại.",
        "material": "Chì (Pb), Thủy ngân (Hg), Cadmium (Cd), Lithium, Axit sulfuric",
        "recyclable": False, # Cần xử lý công nghiệp đặc thù
        "physical_properties": [
            "Vỏ bọc kim loại hình trụ hoặc dẹt",
            "Chứa chất điện phân lỏng hoặc gel bên trong",
            "Dễ bị gỉ sét, sưng phù, chảy dịch ăn mòn màu trắng/vàng khi để lâu"
        ],
        "advantages": [
            "Thu hồi được các kim loại hiếm như Niken, Coban, Lithium tại lò hỏa luyện công nghiệp"
        ],
        "disadvantages": [
            "CỰC KỲ NGUY HIỂM: 1 viên pin cúc áo vứt ra ngoài có thể làm ô nhiễm 500 lít nước hoặc 1 mét khối đất trong 50 năm",
            "Kim loại nặng tích tụ sinh học trong cơ thể người gây suy gan, suy thận, ung thư và tổn thương não bộ",
            "Pin lithium bị đè bẹp trong xe chở rác có thể phát nổ gây hỏa hoạn dữ dội"
        ],
        "reuse_potential": "TUYỆT ĐỐI KHÔNG TÁI SỬ DỤNG khi pin đã hết hoặc có dấu hiệu chảy nước.",
        "recyclability": "Chỉ xử lý an toàn tại các nhà máy chất thải nguy hại được Bộ Tài nguyên cấp phép.",
        "environmental_impact": [
            "Ngấm sâu vào nguồn nước ngầm sinh hoạt gây ngộ độc chì cho cả cộng đồng",
            "Tích tụ trong rau màu, thủy sản và đi thẳng vào bàn ăn con người"
        ],
        "handling_guide": [
            "Bước 1: Tuyệt đối KHÔNG vứt chung vào túi rác sinh hoạt gia đình",
            "Bước 2: Dùng băng dính dán kín hai đầu cực của pin để chống chập điện gây cháy",
            "Bước 3: Chứa trong hũ nhựa hoặc hộp thủy tinh khô ráo, để xa tầm tay trẻ nhỏ",
            "Bước 4: Mang trực tiếp đến các điểm thu gom pin cũ miễn phí (siêu thị, trường học, UBND phường)"
        ],
        "image_url": "https://images.unsplash.com/photo-1619641885409-a1b418e285d8?w=600&auto=format&fit=crop"
    },
    "bong_den_huynh_quang": {
        "slug": "bong-den-huynh-quang",
        "name": "Bóng đèn huỳnh quang & Đèn compact",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["bóng tuýp neon", "bóng đèn chữ U", "đèn compact tiết kiệm điện"],
        "description": "Thiết bị chiếu sáng phóng điện trong môi trường hơi thủy ngân áp suất thấp.",
        "material": "Thủy tinh mỏng, hơi Thủy ngân tự do (Hg), bột huỳnh quang phosphor, đui nhôm",
        "recyclable": False,
        "physical_properties": [
            "Ống thủy tinh dài rất mỏng và dễ vỡ",
            "Bên trong tráng lớp bột trắng mịn",
            "Có chân cắm kim loại ở hai đầu"
        ],
        "advantages": [
            "Thủy tinh và nhôm có thể thu hồi nếu được xử lý trong buồng nghiền chân không kín"
        ],
        "disadvantages": [
            "Chứa hơi thủy ngân tự do: Phát tán ngay tức thì vào không khí khi bóng bị vỡ",
            "Hít phải hơi thủy ngân gây nhiễm độc đường hô hấp cấp tính và tổn thương hệ thần kinh",
            "Mảnh kính mỏng rất sắc gây rách da nhiễm trùng"
        ],
        "reuse_potential": "Không có khả năng tái sử dụng khi bóng đã cháy hỏng.",
        "recyclability": "Phải xử lý qua hệ thống nghiền kín thu gom hơi thủy ngân bằng than hoạt tính.",
        "environmental_impact": [
            "Hơi thủy ngân lan tỏa vào không khí, ngưng tụ vào mây và tạo mưa axit ô nhiễm nguồn nước",
            "Làm ngộ độc hệ sinh vật phù du và tôm cá trong sông hồ"
        ],
        "handling_guide": [
            "Bước 1: Cẩn thận tháo bóng, tránh va đập làm vỡ ống thủy tinh",
            "Bước 2: Bọc bóng đèn vào vỏ hộp carton dài ban đầu hoặc quấn nhiều lớp báo",
            "Bước 3: Nếu bóng bị vỡ: Mở cửa thông gió ngay, dùng bìa cứng hót gom mảnh vụn (KHÔNG dùng máy hút bụi vì sẽ thổi hơi thủy ngân khắp phòng)",
            "Bước 4: Mang đến điểm thu hồi chất thải nguy hại đô thị"
        ],
        "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop"
    },
    "thiet_bi_dien_tu": {
        "slug": "thiet-bi-dien-tu",
        "name": "Rác thải điện tử (E-waste) & Phụ kiện",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["điện thoại hỏng", "chuột bàn phím cũ", "dây sạc đứt", "củ sạc", "tai nghe", "bo mạch điện tử"],
        "description": "Các thiết bị số và vi mạch bán dẫn bị hư hỏng hoặc lỗi thời.",
        "material": "Hỗn hợp nhựa chống cháy BFR, đồng, vàng, bạc, chì, thiếc hàn, silicon",
        "recyclable": True, # Tái chế công nghệ cao
        "physical_properties": [
            "Cấu tạo phức tạp gồm vỏ nhựa cứng, linh kiện bán dẫn, dây đồng",
            "Chứa các mối hàn chì và chip xử lý vi mô"
        ],
        "advantages": [
            "Chứa nhiều kim loại quý (vàng, bạc, đồng, palladium) có giá trị kinh tế rất lớn khi thu hồi bài bản",
            "Nhiều linh kiện có thể sửa chữa tháo rời làm phụ tùng thay thế cho học sinh khó khăn"
        ],
        "disadvantages": [
            "Chất chống cháy chứa brom và kim loại nặng chì gây ngộ độc mãn tính",
            "Tái chế thủ công (đốt bo mạch, ngâm axit) phá hủy nghiêm trọng sức khỏe người lao động và nguồn nước xung quanh"
        ],
        "reuse_potential": "Quyên góp cho các dự án sửa máy tính cũ cho vùng cao; tháo phụ tùng thay thế.",
        "recyclability": "Chỉ an toàn tại các nhà máy xử lý E-waste tiêu chuẩn quốc tế.",
        "environmental_impact": [
            "Chiếm tới 70% tổng lượng kim loại nặng độc hại tại các bãi rác toàn cầu",
            "Khói đen chứa dioxin nếu bị thiêu đốt thủ công"
        ],
        "handling_guide": [
            "Bước 1: Sao lưu và xóa toàn bộ dữ liệu cá nhân trên thiết bị (đối với điện thoại, máy tính)",
            "Bước 2: Không tự ý tháo dỡ hoặc đốt phá bo mạch",
            "Bước 3: Gom tất cả dây cáp, củ sạc, thiết bị vào thùng giấy khô ráo",
            "Bước 4: Đăng ký đổi rác điện tử lấy quà tại các chương trình 'Việt Nam Tái Chế' (Vietnam Recycles)"
        ],
        "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop"
    },
    "thuoc_tan_duoc_het_han": {
        "slug": "thuoc-tan-duoc-het-han",
        "name": "Thuốc tân dược & Dược phẩm hết hạn",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["thuốc kháng sinh cũ", "vỉ thuốc tây", "siro ho hết hạn", "thuốc viên", "thuốc cảm cúm"],
        "description": "Các hóa chất dược phẩm quá hạn sử dụng hoặc không còn dùng đến trong tủ thuốc gia đình.",
        "material": "Hoạt chất hóa dược tổng hợp, kháng sinh, vỏ vỉ nhôm nhựa PVC",
        "recyclable": False,
        "physical_properties": [
            "Dạng viên nén, viên nang, siro lỏng hoặc thuốc mỡ",
            "Có thể đổi màu hoặc chảy nước khi quá hạn"
        ],
        "advantages": [
            "Không có giá trị tái sử dụng"
        ],
        "disadvantages": [
            "NẾU VỨT VÀO BỒN CẦU HOẶC CỐNG: Kháng sinh ngấm vào nguồn nước làm phát sinh vi khuẩn kháng thuốc (siêu vi khuẩn)",
            "Trẻ em hoặc vật nuôi ăn nhầm có thể bị ngộ độc tử vong",
            "Làm biến đổi giới tính và suy giảm sinh sản của các loài cá trong sông hồ"
        ],
        "reuse_potential": "TUYỆT ĐỐI KHÔNG TÁI DÙNG khi thuốc đã hết hạn.",
        "recyclability": "Phải thiêu đốt ở lò nhiệt độ cao trên 1.200 độ C của ngành y tế.",
        "environmental_impact": [
            "Ô nhiễm dược phẩm nguồn nước mặt và nước ngầm diện rộng",
            "Thúc đẩy khủng hoảng vi khuẩn kháng kháng sinh toàn cầu"
        ],
        "handling_guide": [
            "Bước 1: TUYỆT ĐỐI KHÔNG xả thuốc viên hay siro vào bồn cầu hoặc bồn rửa chén",
            "Bước 2: Giữ nguyên trong bao bì vỉ hoặc lọ đậy nắp chặt",
            "Bước 3: Dán nhãn chữ THUỐC HẾT HẠN bên ngoài để tránh uống nhầm",
            "Bước 4: Mang đến điểm thu hồi thuốc hết hạn tại các nhà thuốc hoặc bệnh viện"
        ],
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop"
    },
    "binh_xit_ap_suat": {
        "slug": "binh-xit-ap_suat",
        "name": "Bình xịt áp suất & Bình sơn xịt",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["bình xịt muỗi", "chai xịt tóc keo", "bình sơn xịt atm", "bình xịt khử mùi", "bình xịt côn trùng"],
        "description": "Bình kim loại kín chứa hóa chất và khí nén đẩy có áp suất cao (Aerosol Can).",
        "material": "Vỏ thép/nhôm, khí gas hóa lỏng đẩy (Butane, Propane), dung môi hóa chất",
        "recyclable": True, # Chỉ tái chế khi đã xả sạch khí
        "physical_properties": [
            "Vỏ kim loại kín hình trụ, có đầu van bấm xịt",
            "Áp suất bên trong bình rất lớn kể cả khi đã dùng hết hóa chất"
        ],
        "advantages": [
            "Phần vỏ kim loại tái chế được nếu được đục xả khí chuyên nghiệp"
        ],
        "disadvantages": [
            "CỰC KỲ DỄ PHÁT NỔ: Nếu bị nén ép trong xe chở rác hoặc gặp nhiệt độ cao có thể phát nổ gây cháy lớn",
            "Chứa hóa chất diệt côn trùng độc hại đối với mắt và da"
        ],
        "reuse_potential": "Không tái sử dụng tại nhà do rủi ro cháy nổ.",
        "recyclability": "Phải qua quy trình rút khí nén và làm sạch dung môi trước khi nấu chảy kim loại.",
        "environmental_impact": [
            "Khí đẩy và dung môi hữu cơ bay hơi (VOC) làm thủng tầng ozone và ô nhiễm không khí"
        ],
        "handling_guide": [
            "Bước 1: Bấm xịt hết toàn bộ hóa chất và khí dư ra nơi thoáng gió",
            "Bước 2: TUYỆT ĐỐI KHÔNG đập bẹp, không đục thủng và không ném bình vào đống lửa",
            "Bước 3: Để riêng trong túi rác nguy hại có nhãn cảnh báo",
            "Bước 4: Chuyển giao cho đơn vị thu gom chất thải nguy hại"
        ],
        "image_url": "https://images.unsplash.com/photo-1585336261026-7a760b97063c?w=600&auto=format&fit=crop"
    },
    "nhiet_ke_thuy_ngan": {
        "slug": "nhiet-ke-thuy-ngan",
        "name": "Nhiệt kế thủy ngân vỡ / hỏng",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["nhiệt kế kẹp nách", "cặp nhiệt độ thủy ngân", "huyết áp kế thủy ngân"],
        "description": "Dụng cụ y tế đo nhiệt độ chứa kim loại thủy ngân nguyên chất dạng lỏng.",
        "material": "Thủy tinh mỏng, Thủy ngân lỏng kim loại (Hg)",
        "recyclable": False,
        "physical_properties": [
            "Ống thủy tinh nhỏ có vạch chia độ",
            "Bên trong chứa giọt kim loại màu bạc óng ánh, chuyển động linh hoạt"
        ],
        "advantages": [
            "Không có giá trị tái sử dụng gia đình"
        ],
        "disadvantages": [
            "ĐỘC TÍNH CỰC KỲ CAO: Thủy ngân lỏng bốc hơi ngay ở nhiệt độ phòng thành khí vô hình không mùi",
            "Hít phải hơi thủy ngân gây viêm phổi cấp, suy hô hấp, co giật và tổn thương não vĩnh viễn",
            "Rất dễ lăn tăn vỡ vụn thành hàng nghìn hạt nhỏ len lỏi vào kẽ sàn nhà"
        ],
        "reuse_potential": "TUYỆT ĐỐI KHÔNG TÁI DÙNG.",
        "recyclability": "Chỉ xử lý đặc biệt bằng hóa chất lưu huỳnh kết tủa HgS trong môi trường kín.",
        "environmental_impact": [
            "Làm nhiễm độc vĩnh viễn đất và không khí trong phòng nếu không dọn đúng cách"
        ],
        "handling_guide": [
            "Bước 1: Sơ tán ngay trẻ nhỏ và người già ra khỏi phòng, mở toang cửa sổ thông gió",
            "Bước 2: Đeo găng tay, dùng bìa cứng hoặc ống tiêm hút gom các hạt thủy ngân (TUYỆT ĐỐI KHÔNG dùng máy hút bụi hay chổi quét)",
            "Bước 3: Rắc bột lưu huỳnh (nếu có) lên để phản ứng hóa học khóa thủy ngân lại",
            "Bước 4: Cho vào lọ thủy tinh có nắp đậy kín ngập nước, giao ngay cho cơ sở y tế gần nhất"
        ],
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop"
    },
    "chai_lo_hoa_chat_tay_rua": {
        "slug": "chai-lo-hoa-chat-tay-rua",
        "name": "Vỏ chai hóa chất tẩy rửa & Thuốc diệt cỏ",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["vỏ chai nước tẩy bồn cầu okie", "chai nước thông cống", "vỏ chai thuốc trừ sâu", "chai axít"],
        "description": "Bao bì đựng các dung dịch hóa chất ăn mòn cực mạnh, thuốc bảo vệ thực vật.",
        "material": "Nhựa dày HDPE, cặn hóa chất axit clohidric, clo, hoạt chất bảo vệ thực vật",
        "recyclable": False, # Nguy cơ nhiễm độc cao
        "physical_properties": [
            "Chai nhựa cứng có nắp vặn khóa an toàn",
            "Có mùi hóa chất hắc nồng nặc bốc lên khi mở nắp"
        ],
        "advantages": [
            "Bảo quản an toàn các chất tẩy rửa mạnh trong nhà"
        ],
        "disadvantages": [
            "Hóa chất dư thừa gây bỏng da, mù mắt nếu bắn trúng người",
            "Lẫn vào rác tái chế thông thường sẽ làm nhiễm độc toàn bộ công nhân phân loại rác",
            "Thuốc trừ sâu làm chết cá và ô nhiễm nguồn nước ngầm"
        ],
        "reuse_potential": "TUYỆT ĐỐI KHÔNG DÙNG LẠI ĐỰNG NƯỚC UỐNG HAY NƯỚC MẮM GIA VỊ.",
        "recyclability": "Cần súc rửa trung hòa hóa chất công nghiệp trước khi xử lý nhiệt.",
        "environmental_impact": [
            "Gây chết hàng loạt vi sinh vật có lợi trong đất và nước"
        ],
        "handling_guide": [
            "Bước 1: Đeo găng tay cao su khi xử lý vỏ chai",
            "Bước 2: Không tráng đổ trực tiếp thuốc trừ sâu thừa xuống ao hồ",
            "Bước 3: Vặn chặt nắp chai, ghi rõ chữ CẢNH BÁO HÓA CHẤT",
            "Bước 4: Mang đến điểm thu gom chất thải nguy hại hoặc thùng rác nông nghiệp đồng ruộng"
        ],
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop"
    },
    "khau_trang_y_te": {
        "slug": "khau_trang_y_te",
        "name": "Khẩu trang y tế & Bông băng gạc dính dịch",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Rác Y Tế)",
        "common_names": ["khẩu trang dùng 1 lần", "bông y tế dính máu", "băng gạc vết thương", "que test covid"],
        "description": "Rác thải y tế gia đình có nguy cơ lây truyền mầm bệnh đường hô hấp và truyền nhiễm.",
        "material": "Vải không dệt (nhựa PP), thanh nẹp mũi kim loại, dây thun, vi khuẩn, dịch tiết",
        "recyclable": False,
        "physical_properties": [
            "Màu xanh y tế hoặc trắng, có quai đeo co giãn",
            "Chứa dịch tiết nước bọt, giọt bắn của người dùng"
        ],
        "advantages": [
            "Bảo vệ đường hô hấp ngăn chặn bụi mịn và virus lây lan"
        ],
        "disadvantages": [
            "Là nguồn lây lan mầm bệnh truyền nhiễm nguy hiểm nếu vứt bừa bãi vỉa hè",
            "Dây quai thun làm thắt cổ chân chim biển và động vật hoang dã",
            "Lớp vải không dệt nhựa PP mất 450 năm mới phân hủy"
        ],
        "reuse_potential": "TUYỆT ĐỐI KHÔNG TÁI DÙNG khẩu trang y tế dùng một lần.",
        "recyclability": "Phải thiêu đốt vô trùng tại lò đốt rác thải y tế.",
        "environmental_impact": [
            "Hàng tỷ chiếc khẩu trang trôi nổi đại dương tạo thành bẫy vi nhựa khổng lồ"
        ],
        "handling_guide": [
            "Bước 1: Tháo khẩu trang bằng cách cầm vào quai đeo (tránh chạm tay vào mặt ngoài)",
            "Bước 2: Dùng kéo cắt đứt hai quai đeo để tránh chim thú bị vướng mắc",
            "Bước 3: Bỏ vào túi nilon buộc kín miệng lại",
            "Bước 4: Bỏ vào thùng rác có nắp đậy hoặc thùng rác y tế chuyên dụng"
        ],
        "image_url": "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop"
    },
    "hop_muc_in": {
        "slug": "hop-muc-in",
        "name": "Hộp mực in máy tính & Cartridge",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Nguy Hại)",
        "common_names": ["hộp mực máy in canon", "toner cartridge", "hộp mực in phun", "trống mực in"],
        "description": "Hộp chứa bột mực carbon hoặc mực nước màu dùng trong in ấn văn phòng.",
        "material": "Bột mực mịn Polymer-Carbon (hạt siêu vi 5-8 micromet), vỏ nhựa kỹ thuật, chip điện tử",
        "recyclable": True, # Tái nạp nạp mực
        "physical_properties": [
            "Khối nhựa đen hình hộp chữ nhật dài, có bánh răng và trục từ",
            "Bên trong chứa bột mực mịn màu đen hoặc bột màu"
        ],
        "advantages": [
            "Có thể nạp mực lại (refill) từ 2 đến 3 lần để tiết kiệm chi phí mua mới"
        ],
        "disadvantages": [
            "Bột mực in là các hạt bụi siêu mịn hít phải gây xơ phổi và nguy cơ ung thư đường hô hấp",
            "Bột mực đen bám dính cực kỳ khó tẩy rửa nếu làm rơi vãi ra nhà"
        ],
        "reuse_potential": "Mang đến tiệm dịch vụ nạp mực tái sinh lại.",
        "recyclability": "Nhà sản xuất chính hãng (Canon, HP, Brother) có chương trình thu hồi tái chế vỏ cartridge.",
        "environmental_impact": [
            "Chất màu và hạt carbon làm ô nhiễm nguồn nước ngầm nghiêm trọng nếu chôn lấp"
        ],
        "handling_guide": [
            "Bước 1: Cho hộp mực cũ vào túi nilon kín tránh rò rỉ bột mực ra ngoài",
            "Bước 2: Không tự ý cạy phá trục mực nếu không có kính và khẩu trang bảo hộ",
            "Bước 3: Gửi lại cho đại lý bán máy in hoặc các công ty dịch vụ nạp mực tái sử dụng"
        ],
        "image_url": "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop"
    },
    "dau_an_da_qua_su_dung": {
        "slug": "dau-an-da-qua-su-dung",
        "name": "Dầu mỡ ăn đã chiên rán thừa",
        "category": WasteCategory.HAZARDOUS,
        "category_label": "Nhóm C - Rác Cần Thu Gom Riêng (Gây Hại Cống)",
        "common_names": ["dầu chiên cá", "mỡ lợn rán thừa", "dầu ăn đen", "dầu ăn cháy"],
        "description": "Dầu mỡ thực vật hoặc mỡ động vật bị oxy hóa sau nhiều lần chiên rán ở nhiệt độ cao.",
        "material": "Chất béo triglyceride bị biến tính nhiệt, hợp chất acrylamide độc hại",
        "recyclable": True, # Tái chế làm dầu Biodiesel
        "physical_properties": [
            "Chất lỏng màu nâu đen sẫm, độ nhớt cao, mùi khét",
            "Đông đặc lại thành mảng mỡ trắng đục khi gặp nhiệt độ lạnh"
        ],
        "advantages": [
            "Là nguyên liệu đầu vào cực kỳ giá trị để sản xuất nhiên liệu sinh học Biodiesel hoặc xà phòng công nghiệp"
        ],
        "disadvantages": [
            "TUYỆT ĐỐI KHÔNG ĐỔ VÀO BỒN RỬA BÁT: Dầu mỡ gặp lạnh sẽ đông cứng đóng mảng làm tắc nghẽn toàn bộ hệ thống đường ống thoát nước",
            "Tạo thành các 'Quái vật mỡ' (Fatberg) khổng lồ làm vỡ đường cống thoát nước ngầm thành phố",
            "Đổ ra đất làm chết cây và tạo màng ngăn cản oxy hòa tan trong nước làm cá chết hàng loạt"
        ],
        "reuse_potential": "Gom bán cho các công ty sản xuất dầu sinh học Biodiesel hoặc xà phòng rửa xe.",
        "recyclability": "100% chuyển hóa thành dầu sinh học thân thiện môi trường.",
        "environmental_impact": [
            "1 lít dầu mỡ đổ xuống cống có thể làm ô nhiễm tới 1 triệu lít nước sạch sinh hoạt"
        ],
        "handling_guide": [
            "Bước 1: Để dầu mỡ nguội hoàn toàn sau khi chiên nấu",
            "Bước 2: Lọc bỏ cặn thức ăn cháy đen",
            "Bước 3: Dùng phễu rót dầu vào chai nhựa cũ (chai nước suối) và vặn chặt nắp",
            "Bước 4: Gom nhiều chai gửi cho các dự án thu gom dầu ăn thừa tái chế hoặc bỏ vào rác vô cơ"
        ],
        "image_url": "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop"
    }
}

def get_all_waste_items():
    return list(WASTE_KNOWLEDGE_BASE.values())

def get_waste_by_slug(slug: str):
    return WASTE_KNOWLEDGE_BASE.get(slug)

def search_waste_items(query: str = "", category: str = None):
    results = []
    q = query.lower().strip() if query else ""
    for item in WASTE_KNOWLEDGE_BASE.values():
        if category and item["category"] != category:
            continue
        if not q:
            results.append(item)
            continue
        matches_name = q in item["name"].lower()
        matches_common = any(q in cn.lower() for cn in item["common_names"])
        matches_desc = q in item["description"].lower()
        matches_material = q in item["material"].lower()
        if matches_name or matches_common or matches_desc or matches_material:
            results.append(item)
    return results

def get_detailed_report_for_item(item_key: str, confidence: float = 0.95, is_demo: bool = True, engine_name: str = "Demo Simulation"):
    info = WASTE_KNOWLEDGE_BASE.get(item_key, WASTE_KNOWLEDGE_BASE["chai_nhua"])
    return {
        "item_name": info["name"],
        "category": info["category"],
        "category_label": info["category_label"],
        "confidence": confidence,
        "material_prediction": info["material"],
        "is_demo": is_demo,
        "ai_engine": engine_name,
        "physical_properties": info["physical_properties"],
        "advantages": info["advantages"],
        "disadvantages": info["disadvantages"],
        "reuse_potential": info["reuse_potential"],
        "recyclability": info["recyclability"] if isinstance(info["recyclability"], str) else ("Có thể tái chế" if info["recyclability"] else "Khó tái chế"),
        "environmental_impact": info["environmental_impact"],
        "handling_guide": info["handling_guide"],
        "warning": "⚠️ Chú ý: Đây là chế độ Demo giả lập nhận diện. Hãy kết nối mô hình YOLO/Roboflow để nhận diện vật thể AI thực tế!" if is_demo else None
    }
